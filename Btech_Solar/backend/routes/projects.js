const router = require("express").Router();
let Project = require("../models/project");
const path = require('path')

/*const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,"../backend/uploads");
    },
    filename: (req,file,callback) =>{
        console.log(file)
        callback(null,date.now()+ path.extname(file.originalname));
    }

})
const upload = multer({storage:storage});
*/
router.route("/add"/* ,upload.single('image')*/).post((req,res)=>{

    const projectName = req.body.projectName;
    const projectId = req.body.projectId;
    const location = req.body.location;
    const capacity = req.body.capacity;
    const customer = req.body.customer;
    const cost = req.body.cost;
    const usedProducts = req.body.usedProducts;
    const description = req.body.description;
    //const image = req.file.originalname;

    const newProject = new Project({
        projectName, 
        projectId,
        location,
        capacity,
        customer,
        cost,
        usedProducts,
        description
        //image
    })

    newProject.save().then(()=>{
        res.json("Project Successfully Added")
    }).catch(()=>{
        console.log(err);
    })
})
router.route("/display").get((req,res)=>{

    Project.find().then((projects)=>{
        res.json(projects)
    }) .catch((err)=>{
        console.log(err)
    })     

})

router.route("/update/:id").put(async(req,res)=>{
    let pId = req.params.id;
    const {projectName,projectId,location,capacity,customer,cost,usedProducts,description} = req.body;

    const updateproject = {
        projectName,
        projectId,
        location,
        capacity,
        customer,
        cost,
        usedProducts,
        description
    }
    const update = await Project.findByIdAndUpdate(pId,updateproject).then(()=>{

        res.status(200).send({status:"project updated"})
    }).catch(()=>{
        console.log(err);
        res.status(500).send({status:"Update Error"});
    })

   
})

router.route("/delete/:id").delete(async(req,res)=>{
    let pId = req.params.id;

    await Project.findByIdAndDelete(pId).then(()=>{
        res.status(200).send({status:"Project deleted"})
    }).catch(()=>{
        console.log(err);
        res.status(500).send({status:"Delete Error"});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let pId = req.params.id;
    const p = await Project.findById(pId).then((project)=>{
    res.status(200).send({status:"User fetched", project}) //p= project
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"User fetched error"});
    })
})


router.route("/repair").post(async(req,res)=>{
    const {projectId}= req.body
    const project = await Project.findOne({projectId: projectId})

    if(!project) {
        return res.status(400).json({error: 'No such project'})
    }

    const projectName = project.projectName
    const location = project.location
    const usedProducts = project.usedProducts

    res.status(200).json({projectName, location, usedProducts})
})


module.exports = router;