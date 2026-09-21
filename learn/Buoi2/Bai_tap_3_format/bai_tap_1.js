const formatMessage =(name , subject = "JavaScript" , status = "dang hoc") => `Sinh Vien ${name} ${status} mon ${subject}`;
console.log(formatMessage("An"));
console.log(formatMessage("Binh", "Python"));
console.log(formatMessage("Cuong", "CSS", "da hoan thanh"));