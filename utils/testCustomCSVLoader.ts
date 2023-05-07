import { CustomCSVLoader } from './customCSVLoader';

async function testCustomCSVLoader() {
  const loader = new CustomCSVLoader('C:\Users\iljag\Desktop\iustusai-1\docs\output.csv');
  const documents = await loader.load();

  console.log('Loaded documents:', documents);
}

testCustomCSVLoader()
  .then(() => console.log('Test finished successfully'))
  .catch((error) => console.error('Test failed:', error));
