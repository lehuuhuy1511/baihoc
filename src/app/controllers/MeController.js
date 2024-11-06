const Course = require('../models/Course');

class MeController {
    //[Get] /
    // async index(req, res, next) {
    //     try {
    //         const courses = await Course.find({});
    //         res.json(courses);
    //     } catch (error) {
    //         next(err);
    //     }
    // }

    //promise
    //next là function sẽ đẩy error vào midleware
    // index(req, res, next) { //vào controller
    //     Course.find({}) //chọc vào model
    //     //Sử dụng lean() sau find() với Mongoose
    //     //kích hoạt lean() này sẽ cho Mongoose bỏ qua việc khởi tạo
    //     //toàn bộ tài liệu Mongoose và chỉ cung cấp cho bạn POJO.
    //     //giúp truy vấn nhanh hơn rất nhiều khi sử dụng find().
    //     //".lean() là một phương thức để chuyển đổi kết quả truy vấn từ dạng Mongoose Document sang dạng JavaScript plain object.
    //     // Việc này giúp tối ưu hóa hiệu suất và giảm bớt tài nguyên."
    //         .lean()
    //         .then((courses) => //lấy dữ liệu về controller
    //             res.render('home', { // chọc sang view
    //                 courses, //truyền data vào cho view, view đọc r trả lại client
    //             }),
    //         )
    //         .catch(next);
    // }

    //[Get] /me/stored/courses
    storedCourses(req, res, next) {

        //Promise'
        Promise.all([
            Course.find({}).lean(),  // Convert Mongoose documents to plain objects
            Course.countDocumentsWithDeleted({ deleted: true })
          ])
            .then(([courses, deletedCount]) => 
              res.render('me/stored-courses', {
                deletedCount,
                courses: courses,
              })
            )
            .catch(next);
          
    }

    //[Get] /me/trash/courses
    trashCourses(req, res, next) {
        //Course.findDeleted({ deleted : true })
        Course.findWithDeleted({ deleted : true })
            .lean()
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: courses,
                });
            })
            .catch(next);
    }



    
}

//[POST] .body

module.exports = new MeController();
