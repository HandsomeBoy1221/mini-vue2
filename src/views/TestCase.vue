<template>
  <!--v-model="selected" show-select  -->
  <v-data-table 
  v-model="selected" :headers="headers" :items="desserts" sort-by="calories" 
  show-select class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>测试用例</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark class="mb-2" @click="createTask = true">
              新增任务
            </v-btn>
            &nbsp;&nbsp;&nbsp;&nbsp;

            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              新增用例
            </v-btn>

          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.caseName" label="用例标题"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.caseData" label="用例数据"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.remark" label="备注"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                取消
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确认删除用例?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="createTask" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">测试任务创建</v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field v-model="addTask.name" label="任务名称"></v-text-field>
                <v-text-field v-model="addTask.remark" label="备注"></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#82B1FF" text @click="createTask = false">
                取消
              </v-btn>
              <v-btn color="blue darken-1" text @click="newTask">
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        刷新
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    createTask: false,
    dialog: false,
    dialogDelete: false,
    selected: [],
    addTask:{
      name: '',
      remark:''
    },
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: '用例标题', value: 'caseName' },
      { text: '用例数据', value: 'caseData' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      caseName: '',
      caseData: '',
      remark: '',
    },
    defaultItem: {
      id: 0,
      caseName: '',
      remark: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增用例' : '编辑用例'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$api.testcase.getTestcases().then((result) => {
        console.log("getTestcases", result)
        if(10002 == result.data.code){
          this.desserts = []
        }
        this.desserts = result.data.data
      }).catch((err) => {
        console.log(err)
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editItemConfirm() {

    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1)
      // 获取要删除用例的 id
      console.log(this.editedItem)
      // 调用删除接口
      this.$api.testcase.deletecase(this.editedItem).then((result) => {
        if (result.data.code === 0) {
          this.initialize()
        } else {
          console.log("用例删除失败")
          console.log("deleteTestcase", result)
        }

      }).catch((err) => {
        console.log(err)
      });
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        // 编辑用例，调用更新用例的接口
        console.log("this.editedIndex > -1")
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log("this.editedItem", this.editedItem)
        this.$api.testcase.updateTestcase(this.editedItem).then((result) => {
          if (result.data.code === 0) {
            this.initialize()
          } else {
            console.log("用例更新失败")
            console.log("updateTestcase", result)
          }
        }).catch((err) => {
          console.log(err)
        });
      } else {
        // 新增用例，调用新增用例的接口
        console.log("else")
        // this.desserts.push(this.editedItem)
        this.$api.testcase.addTestCase(this.editedItem).then((result) => {
          if (result.data.code === 0) {
            this.initialize()
          } else {
            console.log("用例新增失败")
            console.log("addTestcase", result)
          }
        }).catch((err) => {
          console.log(err)
        });
      }
      this.close()
    },

    newTask(){
      //打印出来选中的对象
      console.log(this.selected)
      //打印出来对象ID
      let caseIdList = []
      for (let i=0; i<this.selected.length; i++) {
          caseIdList.push(this.selected[i].id)
      }
      console.log(caseIdList)
      //打印出来任务名称
      console.log(this.addTask.name)
      //打印出来任务备注
      console.log(this.addTask.remark)
      //发送添加测试任务数据
      let testTask = {
          name: this.addTask.name,
          testCaseListId: caseIdList,
          remark: this.addTask.remark
      }
      console.log(testTask)

      this.$api.testcase.createTask(testTask).then((result) => {
          console.log(result)
          if (result.data.code === 0) {
              this.createTask = false
              //先弹窗提示，再页面跳转到任务
              window.alert(result.data.message)
              //router内的任务路由
              this.$router.push('/layout/task')
          }
          if (result.data.code === 10001) {
              this.createTask = false
              window.alert(result.data.message)
          }
          
      }).catch((err) => {
          console.log(err)
      });
    },
  },
}
</script>