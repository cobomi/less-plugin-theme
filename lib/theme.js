module.exports = function(less) {
    function filter(rules) {
        for (var i=0; i< rules.length; i++) {
            if (rules[i].type == 'Rule') {
                var theme = false;
                for (var j=i+1; j < rules.length && rules[j].type == 'Comment'; j++) {
                    if (rules[j].value.match(/\/\*\s*theme\s*\*\//)) {
                        theme = true;
                        break;
                    }
                }
                
                if (!theme) {
                  // remove rule
                  rules.splice(i, 1);
                  i--;
                } else {
                  // remove /* theme */
                  rules.splice(j, 1);
                }
            }
        }
    }

    function Theme() {
        this._visitor = new less.visitors.Visitor(this);
    }
    Theme.prototype = {
        isReplacing: false,
        isPreEvalVisitor: true,
        run: function (root) {
            return this._visitor.visit(root);
            this._visitor.visit(root);
            process.exit();
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (!rulesetNode.root) {
                filter(rulesetNode.rules);
            }
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            if (!mixinDefinitionNode.root) {
                filter(mixinDefinitionNode.rules);
            }
        }
    };
    return Theme;
};