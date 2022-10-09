import fs from 'fs';
import flags from 'flags';
import { parse } from 'csv-parse';

flags.defineString('input');
flags.defineString('output');
flags.parse();

fs
  .createReadStream(flags.get('input'))
  .pipe(parse({ columns: true }))
  .on('data', (data) => {
    try {
      const output = flags.get('output');

      if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
      }

      if (!fs.existsSync(`${output}/${data.id}`)) {
        fs.mkdirSync(`${output}/${data.id}`);
      }

      fs.writeFileSync(`${output}/${data.id}/data.json`, JSON.stringify(data));
    } catch (error) {
      // console.error(error);
    }
  });
