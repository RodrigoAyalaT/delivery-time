<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-list>
        <show-field :value="item.name" :label="$t('delivery.product.labels.name')" icon="takeout_dining"/>
        <show-field :value="String(item.price)" :label="$t('delivery.product.labels.price')" icon="price_change"/>
      </v-list>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-list>
        <show-field :value="item.description" :label="$t('delivery.product.labels.description')" icon="description"/>
        <show-field :value="String(item.stock)" :label="$t('delivery.product.labels.stock')" icon="inventory_2"/>
      </v-list>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-list>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-icon color="primary">photo_camera</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="mr-0">
            <v-avatar tile>
              <v-img contain :src="item.image"></v-img>
            </v-avatar>
          </v-list-item-content>
        </v-list-item>
        <show-field :value="item.active" :label="$t('delivery.product.labels.active')" icon="toggle_on"/>
      </v-list>
    </v-col>

  </v-row>
</template>
<script>
import {ShowField} from '@dracul/common-frontend'


export default {
  name: 'ProductShowData',
  components: {ShowField},

  props: {
    item: {type: Object, required: true}
  }
}
</script>

