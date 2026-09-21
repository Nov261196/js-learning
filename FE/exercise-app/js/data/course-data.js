export const courseModules = [
    {
        "id":  "module-01-javascript-fundamentals",
        "title":  "JavaScript Fundamentals",
        "description":  "Nắm chắc cú pháp nền tảng trước khi học ES6, DOM và React.",
        "goals":  [
                      "Biết chọn let hay const và hiểu việc gán lại giá trị.",
                      "Phân biệt string, number, boolean, null, undefined và typeof.",
                      "Dùng toán tử số học, so sánh và logic.",
                      "Viết nhánh điều kiện rõ ràng.",
                      "Biết dùng switch khi so sánh nhiều giá trị cố định.",
                      "Dùng for/while để lặp dữ liệu trước khi học array methods."
                  ],
        "lessons":  [
                        {
                            "id":  "01-01-let-const",
                            "title":  "let \u0026 const",
                            "summary":  "Biến dùng để lưu dữ liệu. Dùng const khi không cần gán lại biến; dùng let khi giá trị của biến sẽ thay đổi.",
                            "code":  "const userName = \"An\";\nlet score = 0;\n\nscore = score + 10;\n\nconsole.log(userName);\nconsole.log(score);",
                            "explanation":  "userName không được gán lại nên dùng const. score thay đổi từ 0 thành 10 nên dùng let.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo const name = \"Minh\" và let age = 18; tăng age lên 19 rồi in ra."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo let cartCount = 0; tăng lần lượt 1, 2 và in kết quả."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích vì sao const button thường được dùng khi lưu DOM element."
                                              }
                                          ]
                        },
                        {
                            "id":  "01-02-data-types",
                            "title":  "Data Types",
                            "summary":  "JavaScript có nhiều kiểu dữ liệu. Với React, bạn thường xuyên xử lý string, number, boolean, array và object.",
                            "code":  "const name = \"Lan\";\nconst age = 20;\nconst isStudent = true;\nlet selectedUser = null;\nlet message;\n\nconsole.log(typeof name);\nconsole.log(typeof age);\nconsole.log(typeof isStudent);",
                            "explanation":  "typeof giúp kiểm tra kiểu dữ liệu. null thường biểu diễn chưa có giá trị; undefined thường xuất hiện khi biến chưa được gán.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo 5 biến thuộc 5 kiểu khác nhau và dùng typeof."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Dự đoán typeof của \"10\", 10, true và undefined."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo biến isLoggedIn và đổi từ false thành true."
                                              }
                                          ]
                        },
                        {
                            "id":  "01-03-operators",
                            "title":  "Operators",
                            "summary":  "Toán tử giúp tính toán và tạo điều kiện. Ưu tiên === thay cho == để tránh ép kiểu ngoài ý muốn.",
                            "code":  "const price = 100;\nconst quantity = 3;\nconst total = price * quantity;\n\nconsole.log(total);\nconsole.log(total \u003e= 300);\nconsole.log(price === 100);",
                            "explanation":  "total bằng 300. Các biểu thức so sánh trả về boolean true/false.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tính tổng tiền của sản phẩm price=250, quantity=4."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Kiểm tra age=20 có \u003e=18 hay không."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo điều kiện isLoggedIn \u0026\u0026 isAdmin với hai biến boolean."
                                              }
                                          ]
                        },
                        {
                            "id":  "01-04-if-else-ternary",
                            "title":  "if / else \u0026 ternary",
                            "summary":  "if/else dùng khi chương trình cần chạy code khác nhau tùy điều kiện. Ternary phù hợp với lựa chọn ngắn gọn.",
                            "code":  "const score = 8;\n\nif (score \u003e= 5) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Fail\");\n}\n\nconst status = score \u003e= 5 ? \"Pass\" : \"Fail\";",
                            "explanation":  "Cả hai cách đều dựa trên cùng điều kiện. Ternary sẽ xuất hiện nhiều trong React JSX.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Kiểm tra age \u003e= 18 để in Adult/Minor."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Phân loại điểm: \u003e=8 Giỏi, \u003e=6.5 Khá, còn lại Cần cố gắng."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Viết ternary trả về \"Online\" hoặc \"Offline\" từ isOnline."
                                              }
                                          ]
                        },
                        {
                            "id":  "01-05-switch",
                            "title":  "switch",
                            "summary":  "switch hữu ích khi một biến có nhiều case cụ thể. Mỗi case thường cần break để không chạy tiếp case sau.",
                            "code":  "const role = \"admin\";\n\nswitch (role) {\n  case \"admin\":\n    console.log(\"Full access\");\n    break;\n  case \"user\":\n    console.log(\"Limited access\");\n    break;\n  default:\n    console.log(\"Unknown role\");\n}",
                            "explanation":  "role được so sánh lần lượt với từng case. default chạy khi không case nào khớp.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết switch cho day = \"monday\"/\"sunday\"."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết switch cho trạng thái đơn hàng pending/shipped/delivered."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thử bỏ break và quan sát kết quả."
                                              }
                                          ]
                        },
                        {
                            "id":  "01-06-loops",
                            "title":  "Loops",
                            "summary":  "Loop lặp một đoạn code nhiều lần. for phù hợp khi biết số lần lặp; while phù hợp khi lặp dựa trên điều kiện.",
                            "code":  "for (let i = 1; i \u003c= 5; i++) {\n  console.log(i);\n}\n\nlet count = 3;\nwhile (count \u003e 0) {\n  console.log(count);\n  count--;\n}",
                            "explanation":  "for in 1→5. while giảm count cho đến khi điều kiện count \u003e 0 sai.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Dùng for in số 1 đến 10."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tính tổng từ 1 đến 100 bằng loop."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Dùng loop in các số chẵn từ 2 đến 20."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-02-functions",
        "title":  "Functions",
        "description":  "Học cách đóng gói logic thành function tái sử dụng.",
        "goals":  [
                      "Tạo và gọi function.",
                      "Truyền dữ liệu vào function.",
                      "Hiểu sự khác nhau giữa return và console.log.",
                      "Lưu function trong biến.",
                      "Hiểu biến sống ở đâu và truy cập được từ đâu."
                  ],
        "lessons":  [
                        {
                            "id":  "02-01-function-declaration",
                            "title":  "Function declaration",
                            "summary":  "Function là một khối code có tên, chỉ chạy khi được gọi.",
                            "code":  "function sayHello() {\n  console.log(\"Hello\");\n}\n\nsayHello();",
                            "explanation":  "Khai báo function chưa chạy code; sayHello() mới thực thi nó.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết function showWelcome in \"Welcome\"."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết function printSeparator in 10 dấu \u0027-\u0027."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Gọi cùng một function 3 lần."
                                              }
                                          ]
                        },
                        {
                            "id":  "02-02-parameters-arguments",
                            "title":  "Parameters \u0026 arguments",
                            "summary":  "Parameter là biến trong khai báo function; argument là giá trị thực tế truyền khi gọi.",
                            "code":  "function greet(name) {\n  console.log(`Hello ${name}`);\n}\n\ngreet(\"An\");\ngreet(\"Lan\");",
                            "explanation":  "name là parameter; \"An\" và \"Lan\" là arguments.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết sum(a,b) in tổng."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết introduce(name,age) in câu giới thiệu."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Viết calculateTotal(price,quantity)."
                                              }
                                          ]
                        },
                        {
                            "id":  "02-03-return",
                            "title":  "return",
                            "summary":  "return gửi giá trị ra khỏi function để code bên ngoài tiếp tục sử dụng. console.log chỉ hiển thị.",
                            "code":  "function multiply(a, b) {\n  return a * b;\n}\n\nconst result = multiply(4, 5);\nconsole.log(result);",
                            "explanation":  "multiply trả về 20; giá trị được lưu vào result.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết square(number) trả về bình phương."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết isAdult(age) trả về boolean."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Viết getFullName(firstName,lastName)."
                                              }
                                          ]
                        },
                        {
                            "id":  "02-04-function-expression",
                            "title":  "Function expression",
                            "summary":  "Function cũng là giá trị trong JavaScript và có thể được gán vào biến.",
                            "code":  "const add = function (a, b) {\n  return a + b;\n};\n\nconsole.log(add(2, 3));",
                            "explanation":  "Biến add tham chiếu tới function và có thể gọi bằng add(...).",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo subtract bằng function expression."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo isEven trả về true/false."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "So sánh cách gọi function declaration và expression."
                                              }
                                          ]
                        },
                        {
                            "id":  "02-05-scope",
                            "title":  "Scope",
                            "summary":  "Biến khai báo trong block/function thường chỉ dùng được trong phạm vi tương ứng. Hiểu scope giúp tránh lỗi biến không tồn tại.",
                            "code":  "const appName = \"Shop\";\n\nfunction showApp() {\n  const message = \"Welcome\";\n  console.log(appName);\n  console.log(message);\n}\n\nshowApp();",
                            "explanation":  "appName ở outer scope nên function đọc được; message chỉ tồn tại bên trong function.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo biến global và đọc trong function."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo biến local rồi thử đọc bên ngoài và ghi nhận lỗi."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thử let trong một block if và kiểm tra scope."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-03-arrays-objects",
        "title":  "Arrays \u0026 Objects",
        "description":  "Làm chủ hai cấu trúc dữ liệu quan trọng nhất trước React.",
        "goals":  [
                      "Tạo, đọc và cập nhật mảng.",
                      "Dùng push/pop/shift/unshift và splice cơ bản.",
                      "Lưu dữ liệu có thuộc tính.",
                      "Thêm, sửa, xóa property.",
                      "Duyệt array và object bằng kiến thức nền."
                  ],
        "lessons":  [
                        {
                            "id":  "03-01-arrays",
                            "title":  "Arrays",
                            "summary":  "Array lưu danh sách dữ liệu theo index bắt đầu từ 0.",
                            "code":  "const skills = [\"HTML\", \"CSS\", \"JavaScript\"];\n\nconsole.log(skills[0]);\nconsole.log(skills.length);\n\nskills[2] = \"JS\";",
                            "explanation":  "skills[0] là phần tử đầu tiên; length là số phần tử.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo mảng 5 môn học và in phần tử thứ 3."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Đổi phần tử cuối của mảng."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "In length trước và sau khi thêm phần tử."
                                              }
                                          ]
                        },
                        {
                            "id":  "03-02-array-crud",
                            "title":  "Array CRUD",
                            "summary":  "Các method cơ bản giúp thêm/xóa dữ liệu; cần biết method nào làm thay đổi mảng gốc.",
                            "code":  "const todos = [\"Learn JS\"];\ntodos.push(\"Practice\");\ntodos.unshift(\"Read\");\ntodos.pop();\n\nconsole.log(todos);",
                            "explanation":  "push thêm cuối, unshift thêm đầu, pop xóa cuối.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Thêm 2 sản phẩm vào cart."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Xóa phần tử đầu và cuối."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Dùng splice để xóa phần tử theo vị trí."
                                              }
                                          ]
                        },
                        {
                            "id":  "03-03-objects",
                            "title":  "Objects",
                            "summary":  "Object mô tả một thực thể bằng cặp key-value, ví dụ user có name, age, role.",
                            "code":  "const user = {\n  name: \"An\",\n  age: 20,\n  active: true\n};\n\nconsole.log(user.name);\nconsole.log(user[\"age\"]);",
                            "explanation":  "Có thể truy cập property bằng dấu chấm hoặc bracket notation.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo object product có id,name,price."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "In hai property bằng hai kiểu truy cập."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thêm property inStock."
                                              }
                                          ]
                        },
                        {
                            "id":  "03-04-object-crud",
                            "title":  "Object CRUD",
                            "summary":  "Property có thể cập nhật bằng phép gán; delete xóa property khỏi object.",
                            "code":  "const user = { name: \"An\", age: 20 };\nuser.age = 21;\nuser.city = \"HCM\";\ndelete user.city;\n\nconsole.log(user);",
                            "explanation":  "age được cập nhật; city được thêm rồi xóa.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Cập nhật price của product."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thêm property category."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Xóa property không cần thiết."
                                              }
                                          ]
                        },
                        {
                            "id":  "03-05-loop-data",
                            "title":  "Loop data",
                            "summary":  "Trước map/filter, cần hiểu dữ liệu được duyệt từng phần tử như thế nào.",
                            "code":  "const scores = [8, 9, 7];\n\nfor (let i = 0; i \u003c scores.length; i++) {\n  console.log(scores[i]);\n}\n\nconst user = { name: \"An\", age: 20 };\nfor (const key in user) {\n  console.log(key, user[key]);\n}",
                            "explanation":  "for dùng index để đọc array; for...in duyệt key của object.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tính tổng mảng numbers bằng for."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tìm số lớn nhất bằng loop."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Duyệt object product và in key/value."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-04-es6",
        "title":  "ES6+",
        "description":  "Viết JavaScript hiện đại, là cú pháp bạn sẽ gặp liên tục trong React.",
        "goals":  [
                      "Nối chuỗi bằng backtick và ${}.",
                      "Viết function ngắn gọn bằng =\u003e.",
                      "Tách dữ liệu từ array/object.",
                      "Gom nhiều arguments thành array.",
                      "Sao chép/gộp array và object theo kiểu immutable.",
                      "Dùng shorthand property, method và computed key.",
                      "Đọc nested property an toàn.",
                      "Đặt giá trị mặc định chỉ cho null/undefined."
                  ],
        "lessons":  [
                        {
                            "id":  "04-01-template-literals",
                            "title":  "Template Literals",
                            "summary":  "Template literal giúp chèn biến/biểu thức vào chuỗi rõ ràng hơn phép +.",
                            "code":  "const name = \"An\";\nconst score = 9;\nconsole.log(`${name} có ${score} điểm`);",
                            "explanation":  "Biểu thức trong ${} được tính rồi chèn vào chuỗi.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo câu giới thiệu từ name,age."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "In tổng price*quantity trong chuỗi."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo chuỗi nhiều dòng bằng backtick."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-02-arrow-functions",
                            "title":  "Arrow Functions",
                            "summary":  "Arrow function thường được dùng làm callback trong map/filter và event handler.",
                            "code":  "const add = (a, b) =\u003e a + b;\nconst square = number =\u003e number * number;\n\nconsole.log(add(2, 3));\nconsole.log(square(4));",
                            "explanation":  "Khi chỉ có một expression có thể bỏ {} và return. Một parameter có thể bỏ ().",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Đổi function multiply sang arrow."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết isAdult bằng arrow."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Viết arrow trả về object bằng ({ ... })."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-03-destructuring",
                            "title":  "Destructuring",
                            "summary":  "Destructuring giúp lấy property hoặc phần tử thành biến ngắn gọn; React dùng rất nhiều.",
                            "code":  "const user = { name: \"An\", age: 20 };\nconst { name, age } = user;\n\nconst colors = [\"red\", \"blue\"];\nconst [first, second] = colors;",
                            "explanation":  "Tên biến object thường trùng key; array dựa vào vị trí.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tách name,price từ product."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tách hai phần tử đầu mảng."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Đổi tên property khi destructuring."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-04-rest-parameters",
                            "title":  "Rest Parameters",
                            "summary":  "Rest parameter dùng ... trong parameter để gom các giá trị còn lại. Nó phải đứng cuối danh sách parameter.",
                            "code":  "const sumAll = (...numbers) =\u003e {\n  let total = 0;\n  for (const number of numbers) total += number;\n  return total;\n};\n\nconsole.log(sumAll(1,2,3,4));",
                            "explanation":  "numbers trở thành array [1,2,3,4].",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết multiplyAll(...numbers)."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết function nhận first và ...others."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích vì sao rest phải đứng cuối."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-05-spread-operator",
                            "title":  "Spread Operator",
                            "summary":  "Spread trải phần tử/property ra vị trí mới. Đây là kỹ thuật cực quan trọng khi cập nhật state trong React.",
                            "code":  "const oldUser = { name: \"An\", age: 20 };\nconst newUser = { ...oldUser, age: 21 };\n\nconst a = [1,2];\nconst b = [...a, 3];",
                            "explanation":  "newUser và b là container mới; property/element cũ được copy ở mức shallow.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Gộp hai mảng."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Cập nhật score của student không sửa object gốc."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thêm phần tử đầu/cuối mà không push."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-06-enhanced-object-literals",
                            "title":  "Enhanced Object Literals",
                            "summary":  "Khi tên biến trùng tên property có thể viết gọn; method cũng có shorthand syntax.",
                            "code":  "const name = \"An\";\nconst score = 9;\nconst key = \"level\";\n\nconst student = {\n  name,\n  score,\n  [key]: 1,\n  show() {\n    return `${name}: ${score}`;\n  }\n};",
                            "explanation":  "name và score là shorthand; [key] tạo key động; show là method shorthand.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo object từ các biến id,title,price."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo computed property từ biến key."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo method getInfo()."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-07-optional-chaining",
                            "title":  "Optional Chaining",
                            "summary":  "?. dừng truy cập và trả undefined nếu phần trước null/undefined.",
                            "code":  "const user = { profile: { name: \"An\" } };\nconsole.log(user.profile?.name);\nconsole.log(user.address?.city);",
                            "explanation":  "address không tồn tại nhưng code không throw error; kết quả undefined.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Đọc user.company?.address?.city."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "So sánh với cách kiểm tra \u0026\u0026 truyền thống."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thử optional chaining với method."
                                              }
                                          ]
                        },
                        {
                            "id":  "04-08-nullish-coalescing",
                            "title":  "Nullish Coalescing",
                            "summary":  "?? khác || ở chỗ 0, false và chuỗi rỗng vẫn được xem là giá trị hợp lệ.",
                            "code":  "const count = 0;\nconsole.log(count ?? 10);\nconsole.log(count || 10);",
                            "explanation":  "?? giữ 0; || coi 0 là falsy nên trả 10.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo default username khi value null."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "So sánh ?? và || với false."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Kết hợp optional chaining và ??."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-05-array-methods",
        "title":  "Array Methods",
        "description":  "Biến đổi và truy vấn dữ liệu theo phong cách React.",
        "goals":  [
                      "Thực hiện hành động cho từng phần tử.",
                      "Biến mỗi phần tử thành dữ liệu mới.",
                      "Giữ lại phần tử thỏa điều kiện.",
                      "Tìm phần tử/vị trí đầu tiên thỏa điều kiện.",
                      "Kiểm tra một hoặc tất cả phần tử.",
                      "Gộp array thành một kết quả.",
                      "Sắp xếp dữ liệu đúng cách và tránh mutation khi cần."
                  ],
        "lessons":  [
                        {
                            "id":  "05-01-foreach",
                            "title":  "forEach",
                            "summary":  "forEach duyệt array nhưng không tạo array mới.",
                            "code":  "const names = [\"An\", \"Lan\"];\nnames.forEach((name, index) =\u003e {\n  console.log(index, name);\n});",
                            "explanation":  "Callback chạy một lần cho mỗi phần tử.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "In từng product name."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tính total bằng biến ngoài + forEach."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "In index và value."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-02-map",
                            "title":  "map",
                            "summary":  "map trả về array mới có cùng số phần tử. Đây là method quan trọng nhất khi render list trong React.",
                            "code":  "const numbers = [1,2,3];\nconst doubled = numbers.map(number =\u003e number * 2);\nconsole.log(doubled);",
                            "explanation":  "Mỗi number được biến thành number*2; mảng gốc không đổi.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Đổi prices thành prices*1.1."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Lấy mảng tên từ array users."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Cập nhật một object theo id bằng map + spread."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-03-filter",
                            "title":  "filter",
                            "summary":  "filter trả array mới; callback true thì giữ phần tử.",
                            "code":  "const scores = [4,8,6,3];\nconst passed = scores.filter(score =\u003e score \u003e= 5);",
                            "explanation":  "Kết quả chỉ chứa 8 và 6.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Lọc product price \u003e 100."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Lọc users active=true."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Xóa item theo id bằng filter."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-04-find-findindex",
                            "title":  "find \u0026 findIndex",
                            "summary":  "find trả phần tử đầu tiên; findIndex trả index; không tìm thấy lần lượt là undefined và -1.",
                            "code":  "const users = [{id:1,name:\"An\"},{id:2,name:\"Lan\"}];\nconst user = users.find(u =\u003e u.id === 2);\nconst index = users.findIndex(u =\u003e u.id === 2);",
                            "explanation":  "user là object Lan; index là 1.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tìm product theo id."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tìm index todo theo id."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Xử lý trường hợp không tìm thấy."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-05-some-every",
                            "title":  "some \u0026 every",
                            "summary":  "some trả true nếu ít nhất một phần tử đúng; every yêu cầu tất cả đúng.",
                            "code":  "const scores = [8,7,4];\nconsole.log(scores.some(s =\u003e s \u003c 5));\nconsole.log(scores.every(s =\u003e s \u003e= 5));",
                            "explanation":  "Có một điểm dưới 5 nên some true; không phải tất cả \u003e=5 nên every false.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Kiểm tra cart có sản phẩm hết hàng."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Kiểm tra tất cả users active."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Kiểm tra có admin hay không."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-06-reduce",
                            "title":  "reduce",
                            "summary":  "reduce tích lũy giá trị qua từng phần tử; thường dùng tính tổng hoặc tạo object tổng hợp.",
                            "code":  "const prices = [100,200,50];\nconst total = prices.reduce((sum, price) =\u003e sum + price, 0);",
                            "explanation":  "sum bắt đầu 0 rồi cộng lần lượt từng price.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tính tổng cart price*quantity."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tìm max bằng reduce."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Đếm số user theo role thành object."
                                              }
                                          ]
                        },
                        {
                            "id":  "05-07-sort",
                            "title":  "sort",
                            "summary":  "sort thay đổi mảng gốc. Khi cần immutable, copy trước bằng spread hoặc toSorted nếu môi trường hỗ trợ.",
                            "code":  "const numbers = [10,2,30];\nconst sorted = [...numbers].sort((a,b) =\u003e a - b);",
                            "explanation":  "Comparator a-b sắp tăng dần; spread bảo vệ mảng gốc.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Sort giảm dần."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Sort products theo price."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Sort users theo name bằng localeCompare."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-06-advanced-functions",
        "title":  "Advanced Functions",
        "description":  "Hiểu callback, higher-order function, lexical scope và closure.",
        "goals":  [
                      "Truyền function vào function khác.",
                      "Nhận hoặc trả về function.",
                      "Hiểu function truy cập scope nơi nó được tạo.",
                      "Hiểu function giữ được biến outer sau khi outer kết thúc."
                  ],
        "lessons":  [
                        {
                            "id":  "06-01-callbacks",
                            "title":  "Callbacks",
                            "summary":  "Callback là function được truyền như dữ liệu để được gọi tại thời điểm thích hợp.",
                            "code":  "function processUser(name, callback) {\n  const message = `Hello ${name}`;\n  callback(message);\n}\n\nprocessUser(\"An\", message =\u003e console.log(message));",
                            "explanation":  "processUser quyết định khi nào callback chạy và truyền message cho callback.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết calculate(a,b,callback)."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Truyền callback cộng và nhân."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích callback trong addEventListener."
                                              }
                                          ]
                        },
                        {
                            "id":  "06-02-higher-order-functions",
                            "title":  "Higher-order Functions",
                            "summary":  "Function nhận function hoặc trả function được gọi là higher-order function; map/filter là ví dụ quen thuộc.",
                            "code":  "const createMultiplier = factor =\u003e {\n  return number =\u003e number * factor;\n};\n\nconst double = createMultiplier(2);\nconsole.log(double(5));",
                            "explanation":  "createMultiplier trả về một function nhớ factor.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo createGreeting(greeting)."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tự viết myForEach(array,callback) đơn giản."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Nhận callback validate trước khi xử lý dữ liệu."
                                              }
                                          ]
                        },
                        {
                            "id":  "06-03-lexical-scope",
                            "title":  "Lexical Scope",
                            "summary":  "JavaScript xác định scope theo vị trí code được viết, không phải vị trí function được gọi.",
                            "code":  "const app = \"Shop\";\nfunction outer() {\n  const user = \"An\";\n  function inner() {\n    console.log(app, user);\n  }\n  inner();\n}\nouter();",
                            "explanation":  "inner nhìn thấy user của outer và app của global scope.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo 3 tầng scope và kiểm tra biến truy cập được."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thử truy cập biến inner từ outer."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích lexical scope bằng lời."
                                              }
                                          ]
                        },
                        {
                            "id":  "06-04-closure",
                            "title":  "Closure",
                            "summary":  "Closure xuất hiện khi function bên trong tiếp tục tham chiếu biến của scope bên ngoài.",
                            "code":  "function createCounter() {\n  let count = 0;\n  return () =\u003e {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());",
                            "explanation":  "Function trả về vẫn giữ count, nên kết quả lần lượt 1 rồi 2.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo createIdGenerator."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo createBankAccount(balance) với deposit."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo function nhớ prefix để format chuỗi."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-07-es-modules",
        "title":  "ES Modules",
        "description":  "Chia code thành file nhỏ bằng export/import, chuẩn bị cho Vite và React.",
        "goals":  [
                      "Xuất và nhập nhiều giá trị theo tên.",
                      "Biết dùng default export khi module có một giá trị chính.",
                      "Chạy ES module bằng type=module."
                  ],
        "lessons":  [
                        {
                            "id":  "07-01-named-export-import",
                            "title":  "Named export/import",
                            "summary":  "ES Modules cho phép tách logic thành file. Named export phải import đúng tên hoặc dùng alias.",
                            "code":  "// math.js\nexport const add = (a,b) =\u003e a + b;\nexport const multiply = (a,b) =\u003e a * b;\n\n// app.js\nimport { add, multiply } from \"./math.js\";\nconsole.log(add(2,3));",
                            "explanation":  "Mỗi giá trị được export theo tên và import bằng dấu {}.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo utils.js export formatPrice và isAdult."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Import với alias."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tách dữ liệu products sang file riêng."
                                              }
                                          ]
                        },
                        {
                            "id":  "07-02-default-export",
                            "title":  "Default export",
                            "summary":  "Mỗi module chỉ có một default export; tên khi import có thể tùy chọn.",
                            "code":  "// api.js\nexport default function getApiUrl() {\n  return \"/api/users\";\n}\n\n// app.js\nimport getApiUrl from \"./api.js\";",
                            "explanation":  "Không dùng {} khi import default.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Default export một class/function."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Kết hợp default và named export."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích khác nhau giữa named/default."
                                              }
                                          ]
                        },
                        {
                            "id":  "07-03-module-setup-in-browser",
                            "title":  "Module setup in browser",
                            "summary":  "Trong HTML, script module cần type=\"module\". Module tự có strict mode và import path phải chính xác.",
                            "code":  "\u003cscript type=\"module\" src=\"./js/app.js\"\u003e\u003c/script\u003e",
                            "explanation":  "Trình duyệt tải app.js như ES Module để dùng import/export.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo index.html + app.js + utils.js."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Cố tình sai đường dẫn import và đọc lỗi."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tách DOM render function sang module."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-08-dom",
        "title":  "DOM",
        "description":  "Dùng JavaScript đọc và thay đổi giao diện HTML.",
        "goals":  [
                      "Lấy element bằng querySelector/querySelectorAll.",
                      "Đọc/sửa textContent và hiểu innerHTML.",
                      "Thêm/xóa/toggle class thay vì nhồi CSS vào JS.",
                      "Đọc/sửa attribute HTML.",
                      "Tạo giao diện động."
                  ],
        "lessons":  [
                        {
                            "id":  "08-01-select-elements",
                            "title":  "Select elements",
                            "summary":  "DOM là representation của HTML trong JavaScript. querySelector lấy phần tử đầu tiên khớp CSS selector.",
                            "code":  "const title = document.querySelector(\"#title\");\nconst buttons = document.querySelectorAll(\".btn\");\n\nconsole.log(title);\nconsole.log(buttons);",
                            "explanation":  "# chọn id, . chọn class; querySelectorAll trả NodeList.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Lấy h1 theo id."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Lấy tất cả li."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Duyệt NodeList và in textContent."
                                              }
                                          ]
                        },
                        {
                            "id":  "08-02-content",
                            "title":  "Content",
                            "summary":  "textContent phù hợp với text thuần. innerHTML parse HTML và cần cẩn thận với dữ liệu không tin cậy.",
                            "code":  "const message = document.querySelector(\"#message\");\nmessage.textContent = \"Đã cập nhật\";",
                            "explanation":  "Nội dung hiển thị của element được thay đổi mà không reload trang.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Đổi title khi load."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Đọc text hiện tại rồi in console."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "So sánh textContent và innerHTML bằng ví dụ tự tạo."
                                              }
                                          ]
                        },
                        {
                            "id":  "08-03-classlist-style",
                            "title":  "classList \u0026 style",
                            "summary":  "classList giúp JS thay đổi trạng thái giao diện còn CSS chịu trách nhiệm trình bày.",
                            "code":  "const box = document.querySelector(\".box\");\nbox.classList.add(\"active\");\nbox.classList.toggle(\"hidden\");",
                            "explanation":  "add thêm class; toggle thêm nếu chưa có và xóa nếu đã có.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Toggle dark class."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Add error class khi dữ liệu sai."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Remove hidden class."
                                              }
                                          ]
                        },
                        {
                            "id":  "08-04-attributes",
                            "title":  "Attributes",
                            "summary":  "Có thể dùng getAttribute/setAttribute hoặc property như input.value, img.src.",
                            "code":  "const image = document.querySelector(\"img\");\nimage.setAttribute(\"alt\", \"Product image\");\nconsole.log(image.getAttribute(\"src\"));",
                            "explanation":  "Attribute được đọc/sửa trực tiếp trên element.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Đổi src ảnh."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Disable/enable button."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Đọc data-id bằng dataset."
                                              }
                                          ]
                        },
                        {
                            "id":  "08-05-create-remove-elements",
                            "title":  "Create/remove elements",
                            "summary":  "createElement tạo node; append/prepend gắn node; remove xóa node.",
                            "code":  "const list = document.querySelector(\"#list\");\nconst li = document.createElement(\"li\");\nli.textContent = \"Learn DOM\";\nlist.append(li);",
                            "explanation":  "li chỉ xuất hiện trên trang sau khi được append vào DOM.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo 3 li từ array bằng loop."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo product card đơn giản."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thêm nút xóa và remove item."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-09-events-forms",
        "title":  "Events \u0026 Forms",
        "description":  "Xử lý tương tác người dùng và form.",
        "goals":  [
                      "Dùng addEventListener.",
                      "Đọc target/currentTarget và dữ liệu sự kiện.",
                      "Đọc giá trị input theo thời gian.",
                      "Xử lý form bằng JS không reload trang.",
                      "Kiểm tra dữ liệu trước khi xử lý."
                  ],
        "lessons":  [
                        {
                            "id":  "09-01-click-events",
                            "title":  "Click events",
                            "summary":  "Event listener đăng ký callback chạy khi sự kiện xảy ra.",
                            "code":  "const btn = document.querySelector(\"#btn\");\nbtn.addEventListener(\"click\", () =\u003e {\n  console.log(\"Clicked\");\n});",
                            "explanation":  "Callback chưa chạy khi đăng ký; nó chạy sau khi người dùng click.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Button đổi text h1."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Counter +1/-1."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Button toggle class."
                                              }
                                          ]
                        },
                        {
                            "id":  "09-02-event-object",
                            "title":  "Event object",
                            "summary":  "Browser truyền event object vào callback, chứa thông tin về sự kiện vừa xảy ra.",
                            "code":  "button.addEventListener(\"click\", event =\u003e {\n  console.log(event.target);\n  console.log(event.currentTarget);\n});",
                            "explanation":  "target là nơi event bắt đầu; currentTarget là element đang xử lý listener.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "In event.type."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Dùng dataset từ event.currentTarget."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "So sánh target/currentTarget với element con."
                                              }
                                          ]
                        },
                        {
                            "id":  "09-03-input-change",
                            "title":  "Input/change",
                            "summary":  "input chạy khi giá trị thay đổi; change thường chạy khi thay đổi được xác nhận.",
                            "code":  "const input = document.querySelector(\"#search\");\ninput.addEventListener(\"input\", event =\u003e {\n  console.log(event.target.value);\n});",
                            "explanation":  "Mỗi lần người dùng gõ, value mới được đọc từ input.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Live preview tên."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Search mảng đơn giản."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Checkbox thay đổi trạng thái."
                                              }
                                          ]
                        },
                        {
                            "id":  "09-04-submit-preventdefault",
                            "title":  "Submit \u0026 preventDefault",
                            "summary":  "Form submit mặc định có thể reload/navigate. preventDefault chặn hành vi đó để JS tự xử lý.",
                            "code":  "form.addEventListener(\"submit\", event =\u003e {\n  event.preventDefault();\n  console.log(\"Submit handled by JS\");\n});",
                            "explanation":  "Form vẫn phát submit event nhưng browser không thực hiện hành vi mặc định.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Form name/email in dữ liệu."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Reset form sau submit."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Chặn submit nếu input rỗng."
                                              }
                                          ]
                        },
                        {
                            "id":  "09-05-form-validation",
                            "title":  "Form validation",
                            "summary":  "Validation phía client cải thiện UX; không thay thế validation phía server.",
                            "code":  "const email = emailInput.value.trim();\n\nif (!email.includes(\"@\")) {\n  error.textContent = \"Email không hợp lệ\";\n}",
                            "explanation":  "Dữ liệu được trim rồi kiểm tra điều kiện trước khi tiếp tục.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Validate username \u003e=3 ký tự."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Validate password \u003e=8."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Form đăng ký có nhiều lỗi và hiển thị message."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-10-asynchronous-javascript",
        "title":  "Asynchronous JavaScript",
        "description":  "Hiểu vì sao code có thể hoàn thành sau và nền tảng của Promise/async-await.",
        "goals":  [
                      "Phân biệt thứ tự thực thi đồng bộ và bất đồng bộ.",
                      "Lên lịch callback theo thời gian.",
                      "Có mô hình tinh thần về call stack, task queue và microtask.",
                      "Nhận ra callback hell và lý do Promise tồn tại."
                  ],
        "lessons":  [
                        {
                            "id":  "10-01-sync-vs-async",
                            "title":  "Sync vs Async",
                            "summary":  "Code synchronous chạy theo call stack. Một số công việc như timer/network hoàn thành sau và callback được xếp để chạy khi phù hợp.",
                            "code":  "console.log(\"A\");\nsetTimeout(() =\u003e console.log(\"B\"), 0);\nconsole.log(\"C\");",
                            "explanation":  "Output là A, C, B. setTimeout không chặn code tiếp theo.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Dự đoán output với hai timer."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thay delay 0/1000 và quan sát."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích vì sao B không chạy ngay."
                                              }
                                          ]
                        },
                        {
                            "id":  "10-02-settimeout-setinterval",
                            "title":  "setTimeout/setInterval",
                            "summary":  "setTimeout chạy một lần; setInterval lặp. Cả hai trả id có thể dùng để hủy.",
                            "code":  "const timerId = setTimeout(() =\u003e {\n  console.log(\"Done\");\n}, 1000);\n\n// clearTimeout(timerId);",
                            "explanation":  "Callback được lên lịch sau ít nhất khoảng thời gian chỉ định.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Thông báo sau 2 giây."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Countdown bằng setInterval."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Dừng interval khi count=0."
                                              }
                                          ]
                        },
                        {
                            "id":  "10-03-event-loop-basics",
                            "title":  "Event loop basics",
                            "summary":  "Event loop chỉ đưa công việc vào stack khi stack trống. Promise callbacks thuộc microtask queue và thường chạy trước timer task sau stack hiện tại.",
                            "code":  "console.log(\"start\");\nsetTimeout(() =\u003e console.log(\"timer\"), 0);\nPromise.resolve().then(() =\u003e console.log(\"promise\"));\nconsole.log(\"end\");",
                            "explanation":  "Thứ tự thường là start, end, promise, timer.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Dự đoán output trước khi chạy."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thêm hai Promise.then."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Giải thích microtask vs timer ở mức cơ bản."
                                              }
                                          ]
                        },
                        {
                            "id":  "10-04-async-callbacks",
                            "title":  "Async callbacks",
                            "summary":  "Nhiều thao tác async phụ thuộc nhau có thể tạo callback lồng sâu, khó đọc và xử lý lỗi.",
                            "code":  "setTimeout(() =\u003e {\n  console.log(\"Step 1\");\n  setTimeout(() =\u003e {\n    console.log(\"Step 2\");\n  }, 500);\n}, 500);",
                            "explanation":  "Step 2 phụ thuộc Step 1 nên callback bị lồng; Promise giúp biểu diễn chuỗi async rõ hơn.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo 3 bước timer lồng nhau."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết ra vấn đề khi số bước tăng."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Chuẩn bị chuyển cùng flow sang Promise ở module sau."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-11-promises",
        "title":  "Promises",
        "description":  "Biểu diễn kết quả async thành công/thất bại và phối hợp nhiều tác vụ.",
        "goals":  [
                      "Hiểu pending/fulfilled/rejected.",
                      "Xử lý thành công, lỗi và cleanup.",
                      "Trả Promise/value từ then đúng cách.",
                      "Chạy nhiều Promise độc lập và chờ tất cả."
                  ],
        "lessons":  [
                        {
                            "id":  "11-01-promise-basics",
                            "title":  "Promise basics",
                            "summary":  "Promise là object đại diện cho một kết quả có thể chưa sẵn sàng. Nó bắt đầu pending rồi settle thành fulfilled hoặc rejected.",
                            "code":  "const promise = new Promise((resolve, reject) =\u003e {\n  setTimeout(() =\u003e resolve(\"OK\"), 500);\n});\n\npromise.then(value =\u003e console.log(value));",
                            "explanation":  "resolve chuyển Promise sang fulfilled và value đi vào then.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo Promise resolve sau 1 giây."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo Promise reject."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Quan sát Promise trong console trước/sau khi settle."
                                              }
                                          ]
                        },
                        {
                            "id":  "11-02-then-catch-finally",
                            "title":  "then/catch/finally",
                            "summary":  "then nhận giá trị fulfilled; catch xử lý rejection; finally chạy bất kể kết quả.",
                            "code":  "Promise.resolve(\"data\")\n  .then(data =\u003e console.log(data))\n  .catch(error =\u003e console.error(error))\n  .finally(() =\u003e console.log(\"finished\"));",
                            "explanation":  "Chain giúp tách success/error/cleanup.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo Promise ngẫu nhiên resolve/reject."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Chain hai then có return."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Dùng finally tắt loading giả lập."
                                              }
                                          ]
                        },
                        {
                            "id":  "11-03-promise-chaining",
                            "title":  "Promise chaining",
                            "summary":  "Giá trị return từ then trở thành input của then tiếp theo; return Promise khiến chain chờ Promise đó.",
                            "code":  "Promise.resolve(2)\n  .then(n =\u003e n * 2)\n  .then(n =\u003e n + 1)\n  .then(console.log);",
                            "explanation":  "Giá trị đi qua chain: 2 → 4 → 5.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Chain 3 phép tính."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo delay(ms,value) trả Promise."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Chain hai delay nối tiếp."
                                              }
                                          ]
                        },
                        {
                            "id":  "11-04-promise-all",
                            "title":  "Promise.all",
                            "summary":  "Promise.all nhận iterable Promise và fulfilled với array kết quả; nếu một Promise reject thì Promise.all reject.",
                            "code":  "const p1 = Promise.resolve(\"user\");\nconst p2 = Promise.resolve(\"posts\");\n\nPromise.all([p1, p2]).then(([user, posts]) =\u003e {\n  console.log(user, posts);\n});",
                            "explanation":  "Hai kết quả được gom theo đúng thứ tự input.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Chạy 3 delay song song."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thử một Promise reject."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Destructure kết quả Promise.all."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-12-async-await",
        "title":  "Async / Await",
        "description":  "Viết Promise theo cú pháp tuyến tính dễ đọc và xử lý lỗi bằng try/catch.",
        "goals":  [
                      "Hiểu async luôn trả Promise.",
                      "Chờ Promise bên trong async function.",
                      "Bắt lỗi async/await.",
                      "Không nuốt lỗi và cung cấp trạng thái UI hợp lý."
                  ],
        "lessons":  [
                        {
                            "id":  "12-01-async-function",
                            "title":  "async function",
                            "summary":  "Thêm async trước function khiến giá trị return được bọc thành Promise.",
                            "code":  "async function getNumber() {\n  return 10;\n}\n\ngetNumber().then(console.log);",
                            "explanation":  "Dù return 10, kết quả gọi getNumber() là Promise fulfilled với 10.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo async getName."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Log kết quả trực tiếp và qua await/then."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo async function throw Error."
                                              }
                                          ]
                        },
                        {
                            "id":  "12-02-await",
                            "title":  "await",
                            "summary":  "await tạm dừng phần còn lại của async function cho đến khi Promise settle, không khóa toàn bộ JavaScript thread.",
                            "code":  "const delay = ms =\u003e new Promise(resolve =\u003e setTimeout(resolve, ms));\n\nasync function run() {\n  console.log(\"Start\");\n  await delay(1000);\n  console.log(\"After 1s\");\n}\n\nrun();",
                            "explanation":  "run tạm dừng tại await nhưng môi trường vẫn có thể xử lý công việc khác.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Chờ hai delay nối tiếp."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Lấy value từ Promise.resolve bằng await."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "So sánh thời gian tuần tự với Promise.all."
                                              }
                                          ]
                        },
                        {
                            "id":  "12-03-try-catch-finally",
                            "title":  "try/catch/finally",
                            "summary":  "Promise rejection tại await được throw như lỗi, nên có thể xử lý bằng try/catch.",
                            "code":  "async function load() {\n  try {\n    const value = await Promise.reject(new Error(\"Failed\"));\n    console.log(value);\n  } catch (error) {\n    console.error(error.message);\n  } finally {\n    console.log(\"done\");\n  }\n}",
                            "explanation":  "catch nhận lỗi rejection; finally phù hợp để tắt loading.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Bắt lỗi từ Promise reject."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Throw lỗi thủ công khi dữ liệu không hợp lệ."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Dùng finally cập nhật biến loading."
                                              }
                                          ]
                        },
                        {
                            "id":  "12-04-error-handling-patterns",
                            "title":  "Error handling patterns",
                            "summary":  "Khi làm app, thường cần loading, success, empty và error state. Lỗi nên được log/hiển thị có ngữ cảnh.",
                            "code":  "async function loadData() {\n  let loading = true;\n  try {\n    return await Promise.resolve([\"A\"]);\n  } catch (error) {\n    console.error(\"loadData:\", error);\n    return [];\n  } finally {\n    loading = false;\n  }\n}",
                            "explanation":  "Flow có cleanup rõ ràng và fallback có chủ đích.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Thiết kế state loading/error/data."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Không dùng catch rỗng."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo helper safeAsync đơn giản hoặc mô tả cách xử lý."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-13-api-fetch",
        "title":  "API \u0026 Fetch",
        "description":  "Gọi HTTP API, đọc JSON và thực hiện CRUD.",
        "goals":  [
                      "Hiểu request/response, method, status và JSON.",
                      "Lấy dữ liệu và kiểm tra response.ok.",
                      "Gửi JSON lên API.",
                      "Biết semantics CRUD cơ bản.",
                      "Kết nối trạng thái API với DOM."
                  ],
        "lessons":  [
                        {
                            "id":  "13-01-http-json",
                            "title":  "HTTP \u0026 JSON",
                            "summary":  "Client gửi HTTP request; server trả status, headers và body. JSON là định dạng dữ liệu phổ biến giữa frontend/backend.",
                            "code":  "const user = {\n  id: 1,\n  name: \"An\"\n};\n\nconst json = JSON.stringify(user);\nconst parsed = JSON.parse(json);",
                            "explanation":  "stringify biến object thành JSON string; parse làm ngược lại.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Stringify array products."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Parse JSON string hợp lệ."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Ghi chú ý nghĩa status 200, 201, 400, 404, 500."
                                              }
                                          ]
                        },
                        {
                            "id":  "13-02-fetch-get",
                            "title":  "fetch GET",
                            "summary":  "fetch trả Promise\u003cResponse\u003e. HTTP 404/500 không tự reject, nên cần kiểm tra response.ok.",
                            "code":  "async function getUsers() {\n  const response = await fetch(\"https://jsonplaceholder.typicode.com/users\");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n}",
                            "explanation":  "await thứ nhất chờ response; response.json() cũng trả Promise nên caller cần await kết quả.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "GET users và in name."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Hiển thị loading/error."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Render danh sách users ra DOM."
                                              }
                                          ]
                        },
                        {
                            "id":  "13-03-post",
                            "title":  "POST",
                            "summary":  "POST thường dùng tạo resource; cần method, headers Content-Type và body JSON.stringify.",
                            "code":  "async function createPost(post) {\n  const response = await fetch(\"https://jsonplaceholder.typicode.com/posts\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(post)\n  });\n  if (!response.ok) throw new Error(\"Create failed\");\n  return response.json();\n}",
                            "explanation":  "Object post được serialize thành JSON trước khi gửi.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "POST title/body/userId."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Đọc response JSON."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Hiển thị lỗi khi !ok."
                                              }
                                          ]
                        },
                        {
                            "id":  "13-04-put-patch-delete",
                            "title":  "PUT/PATCH/DELETE",
                            "summary":  "PUT thường thay toàn bộ representation, PATCH cập nhật một phần, DELETE xóa resource; API cụ thể có thể quy định chi tiết khác.",
                            "code":  "await fetch(\"/api/products/1\", {\n  method: \"PATCH\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ price: 120 })\n});",
                            "explanation":  "PATCH gửi phần dữ liệu muốn thay đổi.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Viết function updateUser(id,data)."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết deleteUser(id)."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Kiểm tra response.ok cho từng request."
                                              }
                                          ]
                        },
                        {
                            "id":  "13-05-loading-error-empty-ui",
                            "title":  "Loading/error/empty UI",
                            "summary":  "Ứng dụng tốt phải cho người dùng biết đang tải, lỗi hoặc không có dữ liệu.",
                            "code":  "async function loadProducts() {\n  statusEl.textContent = \"Loading...\";\n  try {\n    const products = await getProducts();\n    statusEl.textContent = products.length ? \"\" : \"No products\";\n    renderProducts(products);\n  } catch (error) {\n    statusEl.textContent = \"Load failed\";\n  }\n}",
                            "explanation":  "UI phản ánh từng trạng thái thay vì im lặng.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo loading message."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tạo Retry button."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Hiển thị empty state khi array rỗng."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-14-browser-storage",
        "title":  "Browser Storage",
        "description":  "Lưu dữ liệu nhỏ trên trình duyệt và serialize object/array.",
        "goals":  [
                      "Lưu/đọc/xóa string bền qua reload.",
                      "Lưu array/object bằng JSON.stringify/parse."
                  ],
        "lessons":  [
                        {
                            "id":  "14-01-localstorage-basics",
                            "title":  "localStorage basics",
                            "summary":  "localStorage lưu key/value dạng string theo origin. Không dùng để lưu dữ liệu nhạy cảm.",
                            "code":  "localStorage.setItem(\"theme\", \"dark\");\nconst theme = localStorage.getItem(\"theme\");\nlocalStorage.removeItem(\"theme\");",
                            "explanation":  "Dữ liệu tồn tại qua reload cho đến khi bị xóa hoặc storage bị clear.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Lưu username."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Lưu theme và đọc khi load."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tạo nút clear setting."
                                              }
                                          ]
                        },
                        {
                            "id":  "14-02-json-storage",
                            "title":  "JSON storage",
                            "summary":  "Object/array phải serialize thành string trước khi lưu; khi đọc cần parse và xử lý trường hợp null.",
                            "code":  "const favorites = [1, 3, 5];\nlocalStorage.setItem(\"favorites\", JSON.stringify(favorites));\n\nconst saved = JSON.parse(localStorage.getItem(\"favorites\") ?? \"[]\");",
                            "explanation":  "?? \"[]\" tạo fallback JSON hợp lệ khi chưa có dữ liệu.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Lưu array todos."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Thêm/xóa favorite rồi sync storage."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Xử lý JSON hỏng bằng try/catch."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-15-javascript-practice",
        "title":  "JavaScript Practice",
        "description":  "Kết hợp kiến thức thành các bài gần với công việc frontend.",
        "goals":  [
                      "Kết hợp map/filter/reduce và immutable updates.",
                      "Xây pipeline danh sách theo query và sort.",
                      "Render data và event theo cấu trúc function.",
                      "Fetch → transform → render → error."
                  ],
        "lessons":  [
                        {
                            "id":  "15-01-data-transformation",
                            "title":  "Data transformation",
                            "summary":  "Frontend thường nhận raw data rồi biến đổi thành dữ liệu phù hợp để render.",
                            "code":  "const users = [\n  { id: 1, name: \"An\", active: true },\n  { id: 2, name: \"Lan\", active: false }\n];\n\nconst names = users\n  .filter(user =\u003e user.active)\n  .map(user =\u003e user.name);",
                            "explanation":  "Pipeline lọc active trước rồi lấy name.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Từ products lọc inStock rồi map label."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tính cart total bằng reduce."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Update một todo theo id không mutation."
                                              }
                                          ]
                        },
                        {
                            "id":  "15-02-search-filter-sort",
                            "title":  "Search/filter/sort",
                            "summary":  "Một UI danh sách thường áp dụng search → filter → sort lên source data để tạo view data.",
                            "code":  "const visible = [...products]\n  .filter(p =\u003e p.name.toLowerCase().includes(query.toLowerCase()))\n  .sort((a,b) =\u003e a.price - b.price);",
                            "explanation":  "filter tạo subset; copy trước sort để tránh mutation source.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Search users theo name."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Filter category + sort price."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Kết hợp 3 điều kiện vào function getVisibleProducts."
                                              }
                                          ]
                        },
                        {
                            "id":  "15-03-dom-practice",
                            "title":  "DOM practice",
                            "summary":  "Tách render(), event handlers và state giúp code Vanilla JS dễ bảo trì và chuẩn bị tư duy React.",
                            "code":  "let count = 0;\n\nfunction render() {\n  countEl.textContent = count;\n}\n\nplusBtn.addEventListener(\"click\", () =\u003e {\n  count++;\n  render();\n});\n\nrender();",
                            "explanation":  "State thay đổi trước, render đồng bộ UI sau; đây là tư duy gần React.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Todo render từ array."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Filter list khi input."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Event delegation cho nút delete."
                                              }
                                          ]
                        },
                        {
                            "id":  "15-04-api-practice",
                            "title":  "API practice",
                            "summary":  "Đây là flow frontend phổ biến: lấy dữ liệu, kiểm tra, biến đổi, lưu state và render.",
                            "code":  "async function init() {\n  try {\n    const users = await getUsers();\n    const active = users.filter(u =\u003e u.active !== false);\n    renderUsers(active);\n  } catch (error) {\n    showError(error.message);\n  }\n}",
                            "explanation":  "Mỗi function có trách nhiệm rõ ràng giúp debug dễ hơn.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "User Directory từ API."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Search sau khi fetch."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Retry khi request lỗi."
                                              }
                                          ]
                        }
                    ]
    },
    {
        "id":  "module-16-react-preparation",
        "title":  "React Preparation",
        "description":  "Ôn đúng các pattern JavaScript sẽ dùng ngay khi bước vào React.",
        "goals":  [
                      "Cập nhật array/object mà không mutation.",
                      "Thành thạo list transformation và conditional data.",
                      "Tách file có trách nhiệm rõ ràng.",
                      "Viết function API sạch, trả dữ liệu hoặc throw lỗi.",
                      "Hiểu package manager ở mức cần để dùng Vite/React.",
                      "Biết tạo/chạy/build project frontend hiện đại.",
                      "Tự kiểm tra trước khi chuyển React."
                  ],
        "lessons":  [
                        {
                            "id":  "16-01-immutable-data",
                            "title":  "Immutable data",
                            "summary":  "React dựa nhiều vào việc tạo reference mới khi state thay đổi. Hãy quen với spread, map và filter.",
                            "code":  "const user = { name: \"An\", age: 20 };\nconst updatedUser = { ...user, age: 21 };\n\nconst todos = [{id:1,done:false}];\nconst updatedTodos = todos.map(todo =\u003e\n  todo.id === 1 ? { ...todo, done: true } : todo\n);",
                            "explanation":  "Không sửa trực tiếp object/todo cũ; tạo object/array mới.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Update product quantity theo id."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Delete item bằng filter."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Add item bằng spread."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-02-array-object-patterns-for-ui",
                            "title":  "Array/Object patterns for UI",
                            "summary":  "React render UI từ dữ liệu; map, filter, destructuring và ternary xuất hiện liên tục.",
                            "code":  "const labels = users.map(({ id, name, active }) =\u003e ({\n  id,\n  label: `${name} - ${active ? \"Online\" : \"Offline\"}`\n}));",
                            "explanation":  "Một expression kết hợp destructuring, map, object return, template literal và ternary.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo view model cho products."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Filter + map danh sách active users."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Group/summary dữ liệu bằng reduce."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-03-modules-project-structure",
                            "title":  "Modules \u0026 project structure",
                            "summary":  "React/Vite dùng ES Modules mặc định. Cần thoải mái với import/export và relative paths.",
                            "code":  "// utils/formatPrice.js\nexport const formatPrice = value =\u003e `${value.toLocaleString()} đ`;\n\n// app.js\nimport { formatPrice } from \"./utils/formatPrice.js\";",
                            "explanation":  "Utility độc lập được tái sử dụng qua import.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tách api.js, render.js, storage.js."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Dùng named/default export hợp lý."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Sửa lỗi import path."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-04-async-api-patterns",
                            "title":  "Async/API patterns",
                            "summary":  "UI layer không nên chứa toàn bộ chi tiết fetch. Tách API function giúp React component sau này gọn hơn.",
                            "code":  "export async function fetchProducts() {\n  const response = await fetch(\"/api/products\");\n  if (!response.ok) throw new Error(\"Failed to load products\");\n  return response.json();\n}",
                            "explanation":  "Caller chỉ cần await fetchProducts và xử lý loading/error.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo usersApi module."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Chạy hai request bằng Promise.all."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Thiết kế error message thân thiện."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-05-npm-package-json",
                            "title":  "npm \u0026 package.json",
                            "summary":  "npm quản lý dependencies và scripts của project. package.json mô tả project, scripts và package versions.",
                            "code":  "{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\"\n  }\n}",
                            "explanation":  "npm run dev chạy script dev; npm install cài dependencies theo package.json.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo package.json bằng npm init."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Phân biệt dependencies/devDependencies ở mức cơ bản."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Đọc scripts của một project Vite."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-06-vite-basics",
                            "title":  "Vite basics",
                            "summary":  "Vite cung cấp dev server và build tooling. Đây là cách phổ biến để bắt đầu React project.",
                            "code":  "npm create vite@latest\nnpm install\nnpm run dev\nnpm run build",
                            "explanation":  "create tạo scaffold; install cài package; dev chạy server; build tạo production bundle.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Tạo Vanilla Vite project thử nghiệm."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Tìm entry file."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Build và xem thư mục dist."
                                              }
                                          ]
                        },
                        {
                            "id":  "16-07-react-readiness-checkpoint",
                            "title":  "React readiness checkpoint",
                            "summary":  "Bạn không cần biết mọi JavaScript, nhưng phải đọc/viết được function, array methods, immutable updates, modules và async API.",
                            "code":  "const loadActiveUsers = async () =\u003e {\n  const users = await fetchUsers();\n  return users\n    .filter(user =\u003e user.active)\n    .map(user =\u003e ({ ...user, label: user.name.toUpperCase() }));\n};",
                            "explanation":  "Nếu bạn giải thích được từng phần và tự viết bài tương tự, nền JS đã đủ để bắt đầu React.",
                            "exercises":  [
                                              {
                                                  "title":  "Bài 1",
                                                  "description":  "Giải thích từng token quan trọng trong ví dụ."
                                              },
                                              {
                                                  "title":  "Bài 2",
                                                  "description":  "Viết phiên bản cho products."
                                              },
                                              {
                                                  "title":  "Bài 3",
                                                  "description":  "Tự chấm checklist cuối tài liệu trước khi vào React."
                                              }
                                          ]
                        }
                    ]
    }
];

export const courseLessons = courseModules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, id: module.id + "/" + lesson.id })));
