<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="搜索"
          class="mx-4"
        ></v-text-field>
      </template>

      <template v-slot:item.status="{item}">
        <!-- 只有任务状态为新建时，才可以执行任务 -->
          <div v-if="item.status==1">创建任务成功</div>
          <!-- 执行中的任务，无法重新执行，也无法查看结果报告 -->
          <div v-if="item.status==2">执行中</div>
          <!-- 只有任务执行完成后才可以查看报告 -->
          <div v-if="item.status==3"><a @click="getReport(item)">执行完成</a></div>
      </template>

      <!-- 添加的是执行任务按钮 -->
      <template v-slot:item.action="{item}">
        <v-btn v-if="item.status==1" @click="runTask(item)" color="primary">
        执行任务
        </v-btn>
        <v-btn v-else disabled color="primary">
        执行任务
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        calories: '',
        desserts: [
          {
            id: 123,
            name: "测试任务1",
            testCommand: "pwd",
            testCaseListId: [1,2,3,4],
            remark: "4.0",
          },        
        ],
      }
    },
    computed: {
      headers () {
        return [
              {
              text: 'ID',
              align: 'start',
              sortable: false,
              value: 'id',
            },
            { text: '任务名称', value: 'name' },
            { text: '测试任务命令', value: 'testCommand' },
            { text: '测试用例列表', value: 'testCaseListId' },
            { text: '任务状态', value: 'status' },
            { text: '备注', value: 'remark' },
            { text: '操作', value: 'action' },

        ]
      },
    },
    created() {
      this.initialize()
    },
  
    methods: {
      //搜索方法
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
      initialize() {
        this.$api.testtask.getTesttasks().then((result) => {
          console.log("getTesttasks", result)
          if(10002 == result.data.code){
            this.desserts = []
          }
          this.desserts = result.data.data
        }).catch((err) => {
          console.log(err)
        });
      },
      runTask(item){
        //调用后端执行任务接口
        //1.拼接调用参数
        let run_data = {
          id: item.id,
          testCommand: item.testCommand,
          remark: item.remark
        }
        //打印输出拼接参数
        console.log(run_data)
        
        //调用后端api
        //1. 任务的状态更改 更改为执行中
        this.$api.testtask.updateTaskStatus(run_data).then((result) => {
          console.log("updateTaskStatus", result)
          //页面自动刷新
          this.initialize()
        }).catch((err) => {
          console.log(err)
        });

        //2. 任务的执行runTesttask()
        this.$api.testtask.runTesttask(run_data).then((result) => {
          console.log("runTestTask", result)
          //页面自动刷新
          this.initialize()
        }).catch((err) => {
          console.log(err)
        });
      },
      getReport(item){
        //任务id
        let task_id = {
          taskId: item.id
        }

        this.$api.testtask.getReport(task_id).then((result) => {
          console.log("getReport", result)
          if(result.data.code == 0){
            window.open(result.data.data, "_blank")
          }
        
        }).catch((err) => {
          console.log(err)
        });
      
      },
    },
  }
</script>