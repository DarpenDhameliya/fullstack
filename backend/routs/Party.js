/* eslint-disable array-callback-return */
const PDFParser = require("pdf-parse");
// const PDFParser = require("pdf2json");
const express = require("express");
const router = express.Router();
const PartySchema = require("../model/partySchema");
const XLSX = require("xlsx");
// const User = require("../model/UserSchma");
// const pdfjs = require('pdfjs-dist');
const {
  successmessage,
  errormessage,
  successmessagewith,
} = require("../response/Response");
const multer = require("multer");
const fs = require("fs");
// const PdfParse = require("pdf-parse");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./view/uploads");
    },
    filename: function (req, file, cb) {
      console.log(file)
      // cb(null, `${path.extname(file.originalname)}`);
      cb(null, `${Date.now()}_${file.originalname}`);

      // cb(null, req.body.party_name + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file");

const uploadtxt = multer().single("file");

router.get("/list", async (req, res) => {
  // PartySchema.find({ user: req.user }, { "user": 0, "__v": 0 }).then((e) => {
  //     res.status(200).send(successmessage(e));
  // }).catch((error) => {
  //   console.log(error)
  //   return res.status(500).send(errormessage(error))
  // })

  //for using join method populate === join
  // var url = "/../backend/upload";
  // const skip = (1 - 1) * 1;
  // const totalRecords = await PartySchema.countDocuments({user: req.user});
  // const totalPages = Math.ceil(totalRecords / 1);
  // console.log(totalRecords)

  // PartySchema.find({ user: req.user }, { "user": 0, "__v": 0 }).skip(skip).limit(1).toArray().then((e) => {
  //   console.log(e)
  //       // res.status(200).send(successmessage(e));
  //   }).catch((error) => {
  //     console.log(error)
  //     return res.status(500).send(errormessage(error))
  //   })

  const skip = (1 - 1) * 1;
  const totalRecords = await PartySchema.countDocuments({ user: req.user });
  const totalPages = Math.ceil(totalRecords / 1);
  console.log(totalRecords);

  PartySchema.find({ user: req.user }, { user: 0, __v: 0 })
    .skip(skip)
    .limit(2)
    .then((e) => {
      console.log(e);
      // res.status(200).send(successmessage(e));
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send(errormessage(error));
    });
  PartySchema.find()
    .populate("user")
    .exec(function (err, posts) {
      let senddata = [];
      posts.map((e) => {
        let url = `http://localhost:4000/uploads/${e.party_img}`;
        let single = {};
        if (e.user._id.equals(req.user)) {
          single["id"] = e._id;
          single["name"] = e.party_name;
          single["mobile"] = e.mobile;
          single["image"] = url;
          senddata.push({ ...single });
        }
        // else {
        //   return res.status(200).send(successmessage([],['data not available']))
        // }
      });
      return res
        .status(200)
        .send(successmessage(senddata, "data fetch success"));
    });
});

router.post("/add", upload, async (req, res) => {
  const { mobile, party_name } = req.body;
  console.log("==============>1231", req.body);

  try {
    const error = [];
    if (!mobile || !party_name) {
      if (!mobile) {
        error.push("Mobile Nu. Required");
      }
      if (!party_name) {
        error.push("name Required");
      }
      return res.status(402).send(errormessage(error));
    } else {
      let partydetails = PartySchema.create({
        mobile,
        party_name,
        party_img: req.file.filename,
        user: req.user,
      })
        .then((result) => {
          console.log(result);
          return res
            .status(200)
            .send(successmessage(["Name Add Successfully"]));
        })
        .catch((error) => {
          return res.status(500).send(errormessage(error));
        });
      console.log(partydetails);
    }
  } catch (error) {
    console.log("===========================>", error);
    return res.status(500).send(errormessage("file upload required"));
  }
});

router.post("/editdata/:id", upload, async (req, res) => {
  let id = req.params.id;
  let userExist = [];
  let find_party = await PartySchema.find(
    { user: req.user },
    { user: 0, __v: 0 }
  );
  for (let i = 0; i < find_party.length; i++) {
    if (find_party[i]._id.equals(id)) {
      userExist.push(find_party[i]);
    }
  }
  if (userExist.length > 0) {
    return res.status(200).send(successmessagewith(userExist));
  } else {
    return res.status(402).send(errormessage(["user not found"]));
  }
});

router.put("/edit/:id", upload, async (req, res) => {
  const { mobile, party_name } = req.body;
  let id = req.params.id;
  let error = [];
  let new_data = {};
  let userExist = false;
  let find_party = await PartySchema.find({ user: req.user });
  for (let i = 0; i < find_party.length; i++) {
    if (find_party[i]._id.equals(id)) {
      userExist = true;
    }
  }
  if (userExist === true) {
    if (!mobile || !party_name) {
      if (!mobile) {
        error.push("Mobile Number Required");
      }
      if (!party_name) {
        error.push("Name Required");
      }
      return res.status(402).send(errormessage(error));
    } else {
      if (mobile || party_name) {
        if (mobile) {
          new_data.mobile = mobile;
        }
        if (party_name) {
          new_data.party_name = party_name;
        }
      }
      await PartySchema.findByIdAndUpdate(
        req.params.id,
        { $set: new_data },
        { new: true }
      );
      return res
        .status(200)
        .send(successmessage(["party name update successfully"]));
    }
  } else {
    return res.status(401).send(errormessage(["id mismatch"]));
  }
});

router.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let userExist = false;
  let find_party = await PartySchema.find({ user: req.user });
  if (find_party.length > 0) {
    for (let i = 0; i < find_party.length; i++) {
      if (find_party[i]._id.equals(id)) {
        userExist = true;
      }
    }

    if (userExist) {
      PartySchema.findByIdAndDelete(req.params.id)
        .then((e) => {
          res.status(200).send(successmessage(["Name Remove Successfull"]));
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send(errormessage(error));
        });
    } else {
      return res.status(402).send(errormessage(["Id mismatch"]));
    }
  } else {
    return res.status(402).send(errormessage("data not available"));
  }
});

// router.post("/pdffile",  async (req, res) => {

// read txt file
router.post("/txtfile", upload, async (req, res) => {
  const file = req.file;
  let path = req.file.path
  const buffer = file.buffer;

  let data = fs.readFileSync(path, 'utf8');
  
  // data = data.replace(/\s{2,}/g, ',');
  const dataArray = data.split(/\s{2,}/ && /\s{3,}/);
  // const cleanedArray = dataArray.map(item => item.replace(/\t/g, ','));
  // let updata = await data.replace(/  +/g, ",")

  // const arr = data.split("  ");
  console.log('==============>',dataArray)


  // var lines = []
  // lines = data.split('  ');
  // console.log("============>", lines);

  // const result = lines.map(item => {
  //   return item.replace(/\t/g, ' ');
  // })
  // console.log(result)

  // const datslice = lines.split('\t')
  // console.log(datslice)
  // fileData.forEach(line => {
  //   console.log('============<',line)
  //   // if (line.includes(':')) {
  //   //   const [key, value] = line.split(':');
  //   //   parsedData[key.trim()] = value.trim();
  //   // }
  // });

});

// read excel file
router.post("/excelfile", uploadtxt, async (req, res) => {
  const file = req.file;

  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // header include
  // const jsonData = XLSX.utils.sheet_to_json(worksheet,{header:1});

  // remove header from sheet
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

  // 1st method to create array====================================
  var readdata = [];
  var data = {};
  jsonData.map((e) => {
    data["name"] = e[0];
    data["orderId"] = e[1];
    data["awb"] = e[2];
    data["orderstatus"] = e[3];
    data["ordertype"] = e[4];
    data["website"] = e[5];
    data["courier"] = e[6];
    data["qty"] = e[7];
    data["amount"] = e[8];
    data["payment"] = e[9];
    data["receiveamt"] = e[10];
    data["receivedate"] = e[11];

    readdata.push({ ...data });
  });
  // console.log(readdata)
  return res.status(200).send(readdata);

  // 2nd method to create array=======================

  // let data = jsonData.map(e => ({
  //   name: e[0],
  //   orderId: e[1],
  //   awb: e[2],
  //   orderstatus: e[3],
  //   ordertype: e[4],
  //   website: e[5],
  //   courier: e[6],
  //   qty: e[7],
  //   amount: e[8],
  //   payment: e[9],
  //   receiveamt: e[10],
  //   receivedate: e[11]
  // }));

  // console.log(data);

  // 3rd method to create array=====================================

  // const data = jsonData.reduce((acc, curr) => {
  //   acc.push({
  //     name: curr[0],
  //     orderId: curr[1],
  //     awb: curr[2],
  //     orderstatus: curr[3],
  //     ordertype: curr[4],
  //     website: curr[5],
  //     courier: curr[6],
  //     qty: curr[7],
  //     amount: curr[8],
  //     payment: curr[9],
  //     receiveamt: curr[10],
  //     receivedate: curr[11],
  //   });
  //   return acc;
  // }, []);

  //======================================================================= pdf read
  // console.log(data);
  // res.json(jsonData);

  // const data = new Uint8Array(fs.readFileSync(pdfPath));
  // console.log(data)

  // pdfjs.getDocument(data)
  //   .promise.then((pdf) => {
  //     const pageCount = pdf.numPages;
  //     let pdfText = '';

  //     const getPageText = (pageNumber) => {
  //       return pdf.getPage(pageNumber)
  //         .then((page) => page.getTextContent())
  //         .then((content) => {
  //           const pageText = content.items.map(item => item.str).join(' ');
  //           pdfText += pageText;

  //           if (pageNumber < pageCount) {
  //             return getPageText(pageNumber + 1);
  //           } else {
  //             return pdfText;
  //           }
  //         });
  //     };

  //     return getPageText(1);
  //   })
  //   .then((pdfText) => {
  //     // Do something with the extracted text
  //     console.log(pdfText);
  //     res.status(200).json({ success: true, text: pdfText });
  //   })
  //   .catch((error) => {
  //     console.error('Error reading PDF file:', error);
  //     res.status(500).json({ success: false, error: 'Error reading PDF file' });
  //   });
});

// router.post("/excelfile", uploadtxt, async (req, res) => {
//   const file = req.file;

router.post("/pdffile", upload, async (req, res) => {
  console.log("=============>", req.file);
  const file = req.file.path;


  const pdfParser = new PDFParser();


  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  // pdfParser.on("pdfParser_dataReady", pdfData => {
  //     fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
  // });

  pdfParser.loadPDF(file);
  console.log(pdfParser)







  // let data = fs.readFileSync( file )
  // console.log(data)

  // PdfParse(data).then((e) => {
  //   console.log('===========>info',e.info)
  //   console.log('+++++++++++++++++++++++++>text',e.text)
  // })
// var dataArray = []; 
//   fs.readFile(file, (err, buffer) => {
//     if (err) {
//       console.error("Error reading PDF file:", err);
//     }
//     console.log(buffer);
//     PDFParser(buffer)
//       .then((data) => {
//         // const text = data.text;
//         const text = data.text;
//         dataArray = text.split("\n"); // Split the text by a newline character to create an array
//         console.log(dataArray)
//         while (dataArray.length > 0 && dataArray[0].trim() === '') {
//           dataArray.shift();
//         }
//         console.log('==========>after',dataArray)

//       })
//       .catch((error) => {
//         console.error("Error parsing PDF:", error);
//       });
//   });

  // async function extractTextFromPDF(file) {
  //   const doc = await pdfjs.getDocument(file).promise;
  //   const numPages = doc.numPages;
  
  //   let text = '';
  
  //   for (let i = 1; i <= numPages; i++) {
  //     const page = await doc.getPage(i);
  //     const content = await page.getTextContent();
  //     const pageText = content.items.map(item => item.str).join(' ');
  //     text += pageText + ' ';
  //   }
  
  //   return text.trim();
  // }
  
  // // Usage example
  // extractTextFromPDF(file)
  //   .then(text => console.log(text))
  //   .catch(error => console.error(error));



  

  // const fileData = file.buffer.toString("utf-8");
  // console.log(fileData)
  // res.json(jsonData);
  // const data = new Uint8Array(fs.readFileSync(pdfPath));
  // console.log(data)
  // pdfjs.getDocument(data)
  //   .promise.then((pdf) => {
  //     const pageCount = pdf.numPages;
  //     let pdfText = '';
  //     const getPageText = (pageNumber) => {
  //       return pdf.getPage(pageNumber)
  //         .then((page) => page.getTextContent())
  //         .then((content) => {
  //           const pageText = content.items.map(item => item.str).join(' ');
  //           pdfText += pageText;
  //           if (pageNumber < pageCount) {
  //             return getPageText(pageNumber + 1);
  //           } else {
  //             return pdfText;
  //           }
  //         });
  //     };
  //     return getPageText(1);
  //   })
  //   .then((pdfText) => {
  //     // Do something with the extracted text
  //     console.log(pdfText);
  //     res.status(200).json({ success: true, text: pdfText });
  //   })
  //   .catch((error) => {
  //     console.error('Error reading PDF file:', error);
  //     res.status(500).json({ success: false, error: 'Error reading PDF file' });
  //   });
});
// });

module.exports = router;
