<template>
  <div>
    <el-form ref="form" :model="post" label-width="120px">
      <el-form-item label="Post name">
        <el-input v-model="post.name"></el-input>
      </el-form-item>

      <el-form-item label="Post text">
        <el-input type="textarea" v-model="post.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';



export default {
  name: 'CreatePost',
  data() {
    return {
      post:  {
        name: '',
        text: '',
      },
    };
  },
  methods: {
    ...mapActions('posts', ['createPost']),
    async onSubmit() {
      const { name, text } = this.post;
      await this.createPost({ name, text });
    },
  },
};
</script>
