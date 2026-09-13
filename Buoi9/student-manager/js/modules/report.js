import {getAll} from "./studentService.js";

const DEFAULT_DISTRIBUTION = {
  "Giỏi": 0,
  "Khá": 0,
  "Trung bình": 0,
  "Yếu": 0,
};

const getStudentSummary = (student) => ({
  id: student.id,
  name: student.name,
  className: student.className,
  score: student.score,
  result: student.getResult(),
});

export const generateReport = (students = getAll()) => {
  if (!Array.isArray(students) || students.length === 0) {
    return {
      total: 0,
      average: 0,
      highest: null,
      lowest: null,
      distribution: {...DEFAULT_DISTRIBUTION},
    };
  }

  const summary = students.reduce(
    (accumulator, student) => {
      accumulator.totalScore += student.score;
      accumulator.distribution[student.getResult()] =
        (accumulator.distribution[student.getResult()] ?? 0) + 1;
      return accumulator;
    },
    {
      totalScore: 0,
      distribution: {...DEFAULT_DISTRIBUTION},
    },
  );

  const highestStudent = students.reduce(
    (highest, student) => (student.score > highest.score ? student : highest),
    students[0],
  );

  const lowestStudent = students.reduce(
    (lowest, student) => (student.score < lowest.score ? student : lowest),
    students[0],
  );

  return {
    total: students.length,
    average: summary.totalScore / students.length,
    highest: getStudentSummary(highestStudent),
    lowest: getStudentSummary(lowestStudent),
    distribution: summary.distribution,
  };
};

export const formatReport = (report) => {
  if (!report.total) {
    return "Chua co du lieu sinh vien.";
  }

  return [
    `Tong so sinh vien: ${report.total}`,
    `Diem trung binh: ${report.average.toFixed(2)}`,
    `Cao nhat: ${report.highest.name} (${report.highest.score})`,
    `Thap nhat: ${report.lowest.name} (${report.lowest.score})`,
    `Xep loai: Gioi ${report.distribution["Giỏi"]}, Kha ${report.distribution["Khá"]}, Trung binh ${report.distribution["Trung bình"]}, Yeu ${report.distribution["Yếu"]}`,
  ].join("\n");
};


