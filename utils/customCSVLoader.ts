import { Document } from 'langchain/document';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';

async function testCSVLoader(filePath: string) {
  const loader = new CSVLoader(filePath);
  const documents = await loader.load();

  const updatedDocuments = documents.map((doc) => {
    const contentLines = doc.pageContent.split('\n');
    const metadata = { ...doc.metadata };

    const gerichtLines = [];

    contentLines.forEach((line, index) => {
      if (line.startsWith('lfd. Nr.:')) {
        metadata['lfd. Nr.'] = line.slice(9).trim();
      } else if (line.startsWith('Betrag:')) {
        metadata['Betrag'] = line.slice(7).trim();
      } else if (line.startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:')) {
        gerichtLines.push(line.slice(69).trim());
        gerichtLines.push(contentLines[index + 1]);
        gerichtLines.push(contentLines[index + 2]);
        metadata['Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender'] = gerichtLines.join(' ');
      }
    });

    const updatedPageContent = contentLines
    .filter((line, index) => !line.startsWith('lfd. Nr.:') && !line.startsWith('Betrag:') && !line.startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:') && (index === 0 || !contentLines[index - 1].startsWith('Gericht, Datum der Entscheidung, Az., Veröffentlichung bzw. Einsender:')))
    .join('\n');
  
    return new Document({
      pageContent: updatedPageContent,
      metadata,
    });
  });

  console.log('Updated Documents:', updatedDocuments);
}

// Test the script with a sample CSV file
testCSVLoader('C:\\Users\\iljag\\Desktop\\iustusai-1\\docs\\output.csv');     