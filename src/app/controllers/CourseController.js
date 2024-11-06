const Course = require('../models/Course');

class CourseController {
    //[Get] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug }) //slug = :slug trong route-courses.js
            .lean()
            .then((course) => {
                res.render('courses/show', { course });
            })
            .catch(next);
    }

    //[Get] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }

    //[Get] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) =>
                res.render('courses/edit', {
                    course: course,
                }),
            )
            .catch(next);
    }

    //[Put] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id : req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            //redirect tạo header location, khi nó trả về qua response trình duyệt sẽ tự hiểu và điều hướng đến part
            //thêm 1 key là location vào response header của http
            .catch(next)
    }


    //[Delete] /courses/:id
    delete(req, res, next) {
        Course.delete({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)    
    }

    //[Delete] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)    
    }
    
    //[Patch] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)    
    }
    //khi bấm nút khôi phục hãy submit form có method PATCH tại url trên


}

//find() : lấy ra một danh sách các document
//findOne() : tìm 1 bản ghi find one document

module.exports = new CourseController();
