import { Document } from 'langchain/document';
import { readFile } from 'fs/promises';
import { BaseDocumentLoader } from 'langchain/document_loaders';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';


export abstract class BufferLoader extends BaseDocumentLoader {
  constructor(public filePathOrBlob: string | Blob) {
    super();
  }

  protected abstract parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]>;

  public async load(): Promise<Document[]> {
    let buffer: Buffer;
    let metadata: Record<string, string>;
    if (typeof this.filePathOrBlob === 'string') {
      buffer = await readFile(this.filePathOrBlob);
      metadata = { source: this.filePathOrBlob };
    } else {
      buffer = await this.filePathOrBlob
        .arrayBuffer()
        .then((ab) => Buffer.from(ab));
      metadata = { source: 'blob', blobType: this.filePathOrBlob.type };
    }
    return this.parse(buffer, metadata);
  }
}

export class CustomCSVLoader extends BufferLoader {
  protected async parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]> {
    const csvContent = raw.toString();
    const loader = new CSVLoader(csvContent);
    const documents = await loader.load();

    const updatedDocuments = documents.map((doc) => {
      const contentLines = doc.pageContent.split('\n');
      const meta = { ...doc.metadata, ...metadata };

      const gerichtLines = [];

      contentLines.forEach((line, index) => {
        if (line.startsWith('lfd. Nr.:')) {
          meta['lfd. Nr.'] = line.slice(9).trim();
        } else if (line.startsWith('Betrag:')) {
          meta['Betrag'] = line.slice(7).trim();
        } else if (line.startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:')) {
          gerichtLines.push(line.slice(69).trim());
          gerichtLines.push(contentLines[index + 1]);
          gerichtLines.push(contentLines[index + 2]);
          meta['Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender'] = gerichtLines.join(' ');
        }
      });

      const updatedPageContent = contentLines
      .filter((line, index) => !line.startsWith('lfd. Nr.:') && !line.startsWith('Betrag:') && !line.startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:') && (index === 0 || !contentLines[index - 1].startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:')))
      .join('\n');

      return new Document({
        pageContent: updatedPageContent,
        metadata: meta,
      });
    });

    return updatedDocuments;
  }
}
