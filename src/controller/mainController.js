const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const  emailValidator=require("email-validator")



const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, msg: "college data Not found" })
        }
        if (data) {
            if (data.name) {
                const name = data.name.split(" ").join("");
                data.name = name;
            } else {
                return res.status(400).send({ status: false, error: "Name is required" })
            }
            if (!data.fullName) {
                return res.status(400).send({ status: false, error: "Fullname required" })
            }
            if (!data.logoLink) {
                return res.status(400).send({ status: false, error: "LogoLink is required" });
            }
        }
        
        let result = await collegeModel.create(data);
        res.status(201).send({ status: true, message: "College data created successfully",data: result });
    }
    catch (err) {
        res.status(500).send({ msg: err });
    }
}
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let mobile=data.mobile;
        const valiNo=Number(mobile);
        // console.log(valiNo)
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, err: "Intern data Not Found!!" })
        }
        if (data) {
            if (!data.name) {
                return res.status(400).send({ msg: "Name is Required!!" })
            }
            if (!data.email) {
                return res.status(400).send({ msg: "email is required" })
            }
            if (!emailValidator.validate(data.email)) {
                return res.status(400).send({ status: false, err: "Inavlid email" })
            }
            if (!data.mobile) {
                return res.status(400).send({ msg: "mobile is required" })
            }
            if (!(data.mobile.length === 10)) {
                return res.status(400).send({ status: false, err: "Invalid Mobile No." })
            }
            if (isNaN(valiNo)) {
                return res.status(400).send({ status: false, msg: "Invalid No." })
            }
            //College Id is not Mandatory

            // if (!data.collegeId) {
            //     return res.status(400).send({ msg: "CollegeId required !!" })
            // }
            if (data.collegeId) {
                let findCollege = await collegeModel.findById(data.collegeId);

                if (!findCollege) {
                    return res.status(400).send({ err: "Invalid CollegeId" })
                }
            }
        }
        let result = await internModel.create(data);
        res.status(201).send({ status: true, message: "Intern data created successfully",data: result });
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
}


const getCollegeDetails = async function (req, res) {
    try {
        let queryData = req.query;
        let {collegeName} = req.query;

        if (Object.keys(queryData).length > 1) {
            return res.status(400).send({ msg: "Only one param is required-->'collegeName" })
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "CollegeName is Required!!" })
        }
        let result = await collegeModel.findOne({ name: collegeName });
        if(!result) {
            return res.status(404).send({ status:false,msg: "CollegeName not found" })
        }

        let collegeId=result._id
        let result2 = await internModel.find({ collegeId:collegeId}).select({_id:1,email:1,name:1,mobile:1});
        let {name ,fullName,logoLink}=result
        
        const finalData = {
            name: name,
            fullName: fullName,
            logoLink: logoLink,
            intern: result2.length?result2:{message:"No interns applied for this college"}
        }
        
         return res.status(201).send({ status:true,message:  `Intern list`,data:finalData})

    } catch (err) {
        res.status(500).send({ error: err })
    }

}





module.exports.createCollege=createCollege
module.exports.createIntern=createIntern
module.exports.getCollegeDetails=getCollegeDetails