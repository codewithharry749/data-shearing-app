const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    link: {
        type: String,
        required: true,

    },

}
);

const File = mongoose.model('file', FileSchema)

module.exports = File;