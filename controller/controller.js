const User = require("../model/userModel")
const utils = require("../commonFunction/utils")
module.exports = {
    signUp: async (req, res) => {
        try {
            const data = await User.Signup(req.body)
            res.status(utils.Success_Code.Success).json({
                data
            });
        }
        catch (error) {
            res.status(error.status).send(error.message);
        }
    },
    login: async (req, res) => {
        try {
            var result = await User.LogIn(req.body, res);
            if (result == false) {
                res
                    .status(utils.Error_Code.NotMatch)
                    .send(utils.Error_Message.InvalidLogin);
            } else {
                res
                    .status(utils.Success_Code.Success, utils.Success_Message.Login)
                    .send({
                        token: result,
                    });
            }
        } catch (error) {
            res.status(error.status).send(error.message);
        }
    },


}