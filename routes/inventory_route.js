const express = require('express');
const { CategoryModel } = require('../models/category_model');
const { SubCategoryModel } = require('../models/sub_category_model');
const { BrandModel } = require('../models/brand_model');
const router = express.Router();

//addCategory
router.post('/addCategory', async (req, res) => {
    try {
        const checkName = await CategoryModel.findOne({name:req.body.name});
        if(checkName){
            return res.status(400).send({msg:'Category already exists'});
        }
        else{
        const category = new CategoryModel(req.body);
        await category.save();
        res.status(200).send({msg:"Succesfully added"});
        }
    } catch (error) {
        res.status(400).send({msg:'Server error try again later'});
    }
});

router.get('/listOfCategories', async (req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send({msg:'Server error try again later'});
    }
})

router.post('/updateCategory', async (req, res) => {
    try {
        const checkCode = await CategoryModel.findOne({code:req.body.code});
        if(!checkCode){
            return res.status(400).send({msg:'Category not found'});
        }
        else{
            if(checkCode.name == req.body.name){
              return  res.status(200).send({msg:'Updated successfully'});
            }
            else{
                const checkName = await CategoryModel.findOne({name:req.body.name});
                if(checkName){
                    return res.status(400).send({msg:'Category already exists'});
                }
                else{
                  const category = await CategoryModel.updateOne({code:req.body.code},{$set:{name:req.body.name}});
                  return res.status(200).send({msg:'Updated successfully'});
                }
            }
                
       
    }
} catch (error) {
        res.status(500).send({msg:'Server error try again later'});
    }
})

//subCategory
router.post('/addSubCategory', async (req, res) => {
    try {
        const checkName = await SubCategoryModel.findOne({name:req.body.name});
        if(checkName){
            return res.status(400).send({msg:'Sub Category already exists'});
        }
        else{
        const subCategory = new SubCategoryModel(req.body);
        await subCategory.save();
        res.status(200).send({msg:"Succesfully added"});
        }
    } catch (error) {
        res.status(400).send({msg:'Server error try again later'});
    }
}
);

router.get('/listOfSubCategories', async (req, res) => {
    try {
        const subCategory = await SubCategoryModel.aggregate([
            {
                $lookup:{
                    from:'categories',
                    localField:'category',
                    foreignField:'code',
                    as:'category'
                }
            },
            {
                $unwind:{path:'$category',preserveNullAndEmptyArrays:true}
            }
        ]);
        res.status(200).send(subCategory);
    } catch (error) {
        res.status(500).send({msg:'Server error try again later'});
    }
})


router.post('/updateSubCategory', async (req, res) => {
    try {
        const checkCode = await SubCategoryModel.findOne({code:req.body.code});
        if(!checkCode){
            return res.status(400).send({msg:'Sub Category not found'});
        }
        else{
            if(checkCode.name == req.body.name){
              return  res.status(200).send({msg:'Updated successfully'});
            }
            else{
                const checkName = await SubCategoryModel.findOne({name:req.body.name});
                if(checkName){
                    return res.status(400).send({msg:'Sub Category already exists'});
                }
                else{
                  const subCategory = await SubCategoryModel.updateOne({code:req.body.code},{$set:{name:req.body.name}});
                  return res.status(200).send({msg:'Updated successfully'});
                }
            }
            
        }
    } catch (error) {
        res.status(500).send({msg:'Server error try again later'});
    }
}
);

//brands
router.post('/addBrand', async (req, res) => {
    try {
        const checkName = await BrandModel.findOne({name:req.body.name});
        if(checkName){
            return res.status(400).send({msg:'Brand already exists'});
        }
        else{
        const brand = new BrandModel(req.body);
        await brand.save();
        res.status(200).send({msg:"Succesfully added"});
        }
    } catch (error) {
        res.status(400).send({msg:'Server error try again later'});
    }
}
);

router.get('/listOfBrands', async (req, res) => {
    try {
        const brand = await BrandModel.find({});
        return res.status(200).send(brand);
    } catch (error) {
       return res.status(500).send({msg:'Server error try again later'});
    }
})

router.post('/updateBrand', async (req, res) => {
    try {
        const checkCode = await BrandModel.findOne({code:req.body.code});
        if(!checkCode){
            return res.status(400).send({msg:'Brand not found'});
        }
        else{
            if(checkCode.name == req.body.name){
              return  res.status(200).send({msg:'Updated successfully'});
            }
            else{
                const checkName = await BrandModel.findOne({name:req.body.name});
                if(checkName){
                    return res.status(400).send({msg:'Brand already exists'});
                }
                else{
                  const brand = await BrandModel.updateOne({code:req.body.code},{$set:{name:req.body.name}});
                  return res.status(200).send({msg:'Updated successfully'});
                }
            }
            
        }
    } catch (error) {
       return res.status(500).send({msg:'Server error try again later'});
    }
}
);

module.exports = router;