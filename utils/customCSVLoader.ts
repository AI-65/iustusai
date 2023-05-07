import { Document } from 'langchain/document';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';

export class CustomCSVLoader extends CSVLoader {
  public async load(): Promise<Document[]> {
    const documents = await super.load();

    return documents.map((doc) => {
      const updatedPageContent = doc.pageContent;

      return new Document({
        pageContent: updatedPageContent,
      });
    });
  }
}

async function testCustomCSVLoader(filePath: string) {
  const loader = new CustomCSVLoader(filePath);
  const updatedDocuments = await loader.load();
  console.log('Updated Documents:', updatedDocuments);
}

// Test the script with a sample CSV file
testCustomCSVLoader('C:\\Users\\iljag\\Desktop\\iustusai-1\\docs\\output.csv');
