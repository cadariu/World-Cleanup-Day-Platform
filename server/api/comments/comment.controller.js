'use strict';

var Comment = require('./comment.model');

exports.show = function (req, res) {
    if (req.query.pile) {
        Comment.find({pile: req.query.pile}, function (err, comments) {
            if (err) {
                res.handleResponse(500);
            } else {
                res.handleResponse(200, {success: comments});
            }
        });
    } else {
        res.handleResponse(400);
    }
};

exports.create = function (req, res) {
    if (req.query.pile) {
        var comment = new Comment(req.body);
        comment.user = req.user._id;
        comment.pile = req.query.pile;
        comment.created_at = Date.now();
        comment.save(function (err, comment) {
            if (err) {
                res.handleResponse(500, {error: err});
            } else {
                res.handleResponse(200, {success: comment});
            }
        });
    } else {
        res.handleResponse(400);
    }
};
