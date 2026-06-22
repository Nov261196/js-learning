const students = [
  { id: "SV01", name: "An", scores: [8, 7, 9] },
  { id: "SV02", name: "Binh", scores: [4, 3, 5] },
  { id: "SV03", name: "Cuong", scores: [6, 7, 5] },
  { id: "SV04", name: "Dung", scores: [9, 8, 10] }
];

let processedStudents = [];

for (const student of students) {
  const average = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
  const status = average >= 5 ? "Dat" : "Chua dat";
  
  processedStudents = [
    ...processedStudents,
    {
      ...student,
      average,
      status
    }
  ];
}

let passedStudents = [];

for (const item of processedStudents) {
  if (item.status === "Dat") {
    passedStudents = [...passedStudents, item];
  }
}

const finalPipeline = [...passedStudents].sort((a, b) => b.average - a.average);

console.log(finalPipeline);