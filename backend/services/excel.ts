import path from 'path';
import Excel from 'exceljs';
import { TestPaperModel } from '../models/testPaper';
import { ResultModel } from '../models/results';

export const result = async (testId: string, MaxMarks: any) => {
  var workbook = new Excel.Workbook();
  const test = await TestPaperModel.findOne(
    { _id: testId, testconducted: true },
    { testconducted: 1, type: 1, title: 1 }
  );

  if (!test) return null;
  const results = await ResultModel.find(
    { testId },
    { score: 1, userId: 1, testId: 1 }
  )
    .populate('userId')
    .populate('testId');

  const mMarks = await MaxMarks(testId);
  const worksheet = workbook.addWorksheet('Results', {
    pageSetup: { paperSize: 9, orientation: 'landscape' },
  });

  worksheet.columns = [
    { header: 'Test-Title', key: 'Title', width: 20 },
    { header: 'Name', key: 'Name', width: 30 },
    { header: 'Email', key: 'Email', width: 70 },
    {
      header: 'Contact',
      key: 'Contact',
      width: 35,
      outlineLevel: 1,
    },
    {
      header: 'Organisation',
      key: 'Organisation',
      width: 70,
    },
    { header: 'Score', key: 'Score', width: 20 },
    { header: 'Max Marks', key: 'Outof', width: 20 },
  ];

  let M = mMarks;

  results.map((d: any) => {
    worksheet.addRow({
      Name: d.userid.name,
      Email: d.userid.emailid,
      Contact: d.userid.contact,
      Organisation: d.userid.organisation,
      Type: d.testid.type,
      Title: d.testid.title,
      Score: d.score,
      Outof: M,
    });
  });

  await workbook.xlsx.writeFile(
    path.join(__dirname, `../public/result/result-${testId}.xlsx`)
  );
};

module.exports = { result };
