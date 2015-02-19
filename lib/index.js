var theme = require("./theme");

module.exports = {
    install: function(less, pluginManager) {
        var themeVisitor = theme(less);
        pluginManager.addVisitor(new themeVisitor());
    }
};
