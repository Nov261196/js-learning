const course = {
id: "JS01",
name: "Lap trinh JavaScript",
hours: 60,
teacher: "Thay Phong"
};

const { name: courseName, hours: courseHours, teacher: courseTeacher } = course;
console.log(courseName); // "Lap trinh JavaScript"
console.log(courseHours); // 60
console.log(courseTeacher); // "Thay Phong"