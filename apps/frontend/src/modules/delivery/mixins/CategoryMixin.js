export default {
    computed: {
        getCategories() {
            return this.$store.getters.getCategories
        },
        getItemsCategories() {
            return this.$store.getters.getCategories.filter(category => this.hasCategoryItems(category))
        },
        getItemsByCategory() {
            return category => {
                return this.items.filter(i => i.product.category.id === category.id)
            }
        },
        hasCategoryItems() {
            return category => {
                return this.items.some(i => i.product.category.id === category.id)
            }
        }
    },
}
