const { request } = require("express");
const  express = require ("express");
const  userModel =require ("../models/usermodel");
const router = new express.Router();

const UserRoute = () => {
  router.post("/register", async (req, res) => {
    try {
      console.log(req.body);
      let { username,dob } = req.body;
      const registerObject = { username, dob };
      const svaeRegisteration = new userModel(registerObject);
      const saved = await svaeRegisteration.save();
      if (saved) {
        res.send({
          code: 200,
          msg: "Register Successfully",
        });
      }
    } catch (e) {
      console.log(e);
      res.send({
        code: 500,
        msg: e.message,
      });
    }
  });



  router.patch("/:id", async (req, res) => {
    try {
      const { username, dob } = req.body;
      const id ={_id:req.params.id}
      const updateobj = {
          $set:req.body
      }
      const updatedata = await userModel.findByIdAndUpdate(id,updateobj)
      if(updatedata){
          res.send({
              code : 200,
              msg:"Updated successfully"
          })
      }
    } catch (error) {
        console.log(error)
      res.send({ code: 500, msg: "Updation failed" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deleteUser = await userModel.deleteOne(req.body.params);
      if(deleteUser){
          res.send({
              code:200,
              msg:"Deleted successfully"
          })
      }
    } catch (e) {
      res.send({
        code: 500,
        msg: "No User Found !!!",
      });
    }
  });

  router.get("/userList", async (req, res) => {
    try {
      const userList = await userModel.find({});
      res.send(userList);
    } catch (e) {
      res.send({
        code: 500,
        msg: "No User Found !!!",
      });
    }
  });


  router.get("/search", async (req, res) => {
    try {
      const searchData = await userModel.find(
        {
          $or: [
            {
              username: {
                $regex: new RegExp("^" + req.query.search.toLowerCase(), "i"),
              },
            },
            {
              dob: {
                $regex: new RegExp("^" + req.query.search.toLowerCase(), "i"),
              },
            },
          ],
        },
        {
          username: 1,
          dob: 1,
        }
      );
      if (searchData) {
        res.send(searchData);
      }
    } catch (e) {
      res.send({
        code: 500,
        msg: "Internal Server Error",
      });
    }
  });

  return router;
};
module.exports = UserRoute;
