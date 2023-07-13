const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactsModel");
//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContacts =asyncHandler(async(req,res) => {
    const contacts =await Contact.find();
    res.status(200).json(contacts);
})

//@desc Create New Contacts
//@route POST /api/contacts
//@access public
const createContact =asyncHandler(async(req,res) => {
    console.log(req.body)
    const {name,phone,email} = req.body;
    if(!name || !phone || !email){
        throw new Error("all field required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
})
//@desc Get Contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });
//@desc Update Contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact =asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
})
//@desc Delete Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact =asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
})



module.exports = { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact 
};