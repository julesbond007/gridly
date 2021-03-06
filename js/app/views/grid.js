/**
 * Represents a requirejs module for a dynamic Grid.
 */

define(['jquery', 
        'underscore', 
        'backbone', 
        'marionette', 
        'app/views/gridRow', 
        'hbs!app/templates/grid/gridTemplate'], 
        function($, _, Backbone, Marionette, GridRow, gridTemplate) {

    return Backbone.Marionette.CompositeView.extend({
        template : gridTemplate,
        tagName : "table",
        className : "table table-bordered table-striped",
        itemView : GridRow,

        events : {
            "click .icon-sort" : "sort"
        },

        initialize : function(options) {
            _.bindAll(this, "render");
            this.listenTo(this.collection, 'reset sort change', this.render);
            this.model = new Backbone.Model();
            if (options.columns) {
                this.model.set('columns', options.columns);
            }
        },

        /**
         * Append child views in the 'tbody' tag
         *
         */
        appendHtml : function(collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        },

        /**
         * Method to sort our grid by fieldName and direction: ascending or descending depending
         * on what the user clicks.
         *
         */
        sort : function(e) {
            e.preventDefault();
            e.stopPropagation();
            var sortBy = $(e.currentTarget).data("sortby");
            var direction = $(e.currentTarget).data("sortdir");

            this.collection.sortByField(sortBy, direction);
        }
    });
});
