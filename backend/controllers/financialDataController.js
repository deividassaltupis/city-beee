import fs  from 'fs';
import util from 'util';
const readFilePromise = util.promisify(fs.readFile);

const getFinancialData = async () => 
    JSON.parse(await readFilePromise('data/financial_data.json', 'utf8'));

export default getFinancialData;