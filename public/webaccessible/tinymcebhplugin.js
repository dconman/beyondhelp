(function () {
    tinymce.PluginManager.add("beyondhelp", function (editor, url) {
        "use strict";

        const openBhWindow = function () {
            editor.windowManager.open({
                title: "Beyond Help",
                url: url + "/tinymcebhdialog.html",
                bodyType: "tabpanel",
                width: 800,
                height: 400
            });
        }

        editor.addButton("beyondhelp", {
            image: url + "/icon-black.svg",
            context: "tools",
            tooltip: "Beyond Help (Alt + B)",
            onclick: openBhWindow,
            onPostRender: function () {
                const ctrl = this;
                editor.on("NodeChange", e => {
                    const jqNode = $(editor.selection.getNode());
                    ctrl.active(jqNode.closest("table.compendium-left-aligned-table").length > 0);
                });
            }
        });

        editor.addButton("bhfullscreen", {
            icon: "fullscreen",
            context: "tools",
            tooltip: "Toggle Fullscreen (Alt + F)",
            onclick: () => editor.execCommand("mceFullscreen")
        });

        editor.shortcuts.add("alt+b", "Opens Beyond Help Window.", openBhWindow);
        editor.shortcuts.add("alt+f", "Toggle Fullscreen.", "mceFullscreen");
    });
})();