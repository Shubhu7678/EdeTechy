import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponents';
import toast from 'react-hot-toast';
import CourseSlider from '../components/core/CatalogPage/CourseSlider';
import CourseCard from '../components/core/CatalogPage/CourseCard';
import Footer from '../components/common/Footer';

const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [active, setActive] = useState(0);

    useEffect(() => {

        const getAllCategoriesDetails = async () => {

            const toastId = toast.loading('Loading...');
            const result = await apiConnector('GET', categories.CATEGORIES_API);
            if (result) {
                const category_id = result.data.allCategories.filter((category) => category.name === catalogName)[0]._id;
                toast.dismiss(toastId);
                console.log(category_id);
                setCategoryId(category_id);
            }
        }

        getAllCategoriesDetails();

    }, [catalogName]);

    useEffect(() => {

        const getAllChoosedCategories = async () => {
            if (!categoryId) {

                return;
            }
            try {
                const result = await getCatalogPageData(categoryId);
                setCatalogPageData(result);

            } catch (err) {

                console.log(err);
            }
        }

        getAllChoosedCategories();

    }, [categoryId]);

    return (
        <div className="text-white">

            {/* Section 1 */}
            <div className="w-full h-[200px] bg-richblack-700 relative">
                <div className="w-11/12  mx-auto pt-16 max-w-maxContent">
                    <div className="flex flex-col gap-1">
                        <p>
                            {`Home / Catalog / `}
                            <span className="text-yellow-50">{catalogPageData?.selectedCategory?.name}</span>
                        </p>
                        <p className="text-3xl text-richblack-25 font-semibold">{catalogPageData?.selectedCategory?.name}</p>
                        <p className="text-richblack-100 text-base">{catalogPageData?.selectedCategory?.description}</p>
                    </div>
                </div>

            </div>

            {/* Section 2 */}

            <div className="w-full my-10">
                {/* Module 1 */}
                <div className="w-11/12 max-w-maxContent mx-auto">
                    <div className="text-3xl font-semibold">Courses to get you started</div>
                    <div className="flex gap-3 my-2 border-richblack-700 border-b-2">
                        <p
                            onClick={() => setActive(0)}
                            className={`${active === 0 ? 'text-yellow-50 border-yellow-50 border-b-2' : 'text-richblack-100'} cursor-pointer`}>
                            Most Popular
                        </p>
                        <p
                            onClick={() => setActive(1)}
                            className={`${active === 1 ? 'text-yellow-50 border-yellow-50 border-b-2' : 'text-richblack-100'} cursor-pointer`}
                        >New</p>
                    </div>
                    <div className="mt-4">
                        {console.log(catalogPageData)}
                        <CourseSlider
                            Courses={catalogPageData?.selectedCategory?.courses}
                        />
                    </div>
                </div>

                {/* Module 2  */}
                <div className="w-11/12 max-w-maxContent mx-auto mt-10">
                    <p className="text-3xl font-semibold">Top Courses in {catalogPageData?.selectedCategory?.name}</p>
                    <div className="mt-8">
                        <CourseSlider
                            Courses={catalogPageData?.differentCategory?.courses}
                        />
                    </div>
                </div>
                {/* Modeule 3  */}
                <div className="mt-10 w-11/12 max-w-maxContent mx-auto">
                    <p className="text-3xl font-semibold">Frequently Bought</p>
                    <div>
                        <div className="flex mt-8 gap-10 flex-wrap">
                            {
                                catalogPageData?.mostSellingCourses.map((course, index) =>
                                (
                                    <CourseCard course={course} key={index} Height={"h-[400px]"} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog