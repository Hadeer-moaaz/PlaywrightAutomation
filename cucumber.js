// cucumber.js
module.exports = {
    default: {
        require: ['features/step_definitions/**/*.js','features/support/**/*.js'],
        paths: ['features/**/*.feature'],
        publishQuiet: true,
    }
};