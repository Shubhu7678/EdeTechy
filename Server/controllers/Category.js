const Category = require('../models/Category');
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

// * create category handler function

const createCategory = async (req, res) => {

    try {

        //* get data from request body

        const { name, description } = req.body;

        //* validation if data is not empty

        if (!description || !name) {

            return res.status(401).json({

                success: false,
                message: "All fields are required",
            });
        }

        //* create entry in DB

        const categoryDetails = await Category.create({ name: name, description: description });

        return res.status(200).json({

            success: true,
            message: "Category Created Successfully...",
            categoryDetails,
        })


    } catch (err) {

        res.status(500).json({

            success: false,
            message: "Internal Error in Category",
        })

    }

}

//* get All Categories 

const showAllCategories = async (req, res) => {

    try {

        //* get all details from collection

        const allCategories = await Category.find({}, { name: true, description: true });

        res.status(200).json({

            success: true,
            message: "Successfully get all the Categories",
            allCategories,
        });

    } catch (err) {

        return res.status(500).json({

            success: false,
            message: "Internal Error when get the Categories",
            error: err.message,
        })
    }

}

const categoryPageDetails = async (req, res) => {

    try {

        //get category Id from request body
        const { categoryId } = req.body;
        //get all the courses by category id
        //TODO: rating and reviews will be uncomment later
        const selectedCategory = await Category.findById(
            { _id: categoryId }
        )
            .populate({

                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
                // populate: {

                //     path: "ratingAndReviews",
                // }
            })
            .exec();

        //validation

        if (!selectedCategory) {

            return res.status(404).json({

                success: false,
                message: "Data not found"
            })
        }

        //selected category have no courses

        if (selectedCategory.courses.length === 0) {

            console.log("There are no courses for selected Category");
            return res.status(404).json({

                success: false,
                message: "There are no courses for selected Category",
            });
        }

        //get courses from different categories

        const categoriesExceptSelected = await Category.find({
            _id: {
                $ne: categoryId,
            },
        });

        let differentCategory = await Category.findOne(

            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        // get top selling courses
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        return res.status(200).json({

            success: true,
            message : "Fetched Category details successfully",
            selectedCategory,
            differentCategory,
            mostSellingCourses
        })

    } catch (error) {

         return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })

    }
}

module.exports = { createCategory, showAllCategories, categoryPageDetails };