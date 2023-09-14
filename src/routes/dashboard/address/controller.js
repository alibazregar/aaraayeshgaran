const controller = require("../../controller");
const fs = require("fs").promises;

module.exports = new (class extends controller {
  async addAddress(req, res) {
    try {
      const {receiverName,state,receiverPhone ,address,city,postCode} = req.body
      const newAddress = new this.UserAddress({
        user:req.user._id,
        receiverName:receiverName,
        receiverPhone:receiverPhone,
        state:state,
        city:city,
        address:address,
        postCode:postCode,
      })
      await newAddress.save()
      return res.status(200).json({message:"آدرس جدید با موفقیت ثبت شد", result: null})
    } catch (error) {
      console.log(`add address Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async getUserAddresses(req, res) {
    try {
      const userAddresses = await this.UserAddress.find({user:req.user._id})
      if(userAddresses.length==0){
        return res.status(200).json({message:"آدرسی ثبت نشده است",result: null})
      }
      return res.status(200).json({message:null,result:userAddresses})
    } catch (error) {
      console.log(`get user addresses Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async deleteUserAddress(req, res) {
    try {
      const address = await this.UserAddress.findById(req.params.id);
      if(!address) {
        return res.status(400).json({ message:"آیدی نامعتبر", result: null})
      }
      await address.delete()
      return res.status(200).json({ message:"با موفقیت حذف شد", result: null}) 
    } catch (error) {
      console.log(`delete user address Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async editUserAddress(req, res) {
    try {
      const address = await this.UserAddress.findById(req.params.id);
      if(!address) {
        return res.status(400).json({ message:"آیدی نامعتبر", result: null})
      }
      await this.UserAddress.updateOne({ _id: req.params.id }, req.body)
      return res.status(200).json({ message:"با موفقیت به روز رسانی شد", result: null})
    } catch (error) {
      console.log(`edit user address Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async getAddressByID(req, res) {
    try{
      const address = await this.UserAddress.findOne({_id: req.params.id, user: req.user._id})
      return res.status(200).json({result: address})
    } catch (error) {
      console.log(`get address Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
})();
