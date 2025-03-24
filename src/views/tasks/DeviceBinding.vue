<template>
  <div class="task-config">
    <!-- 任务设置 -->
    <el-card class="box-card">

      <el-divider content-position="left">
        <h3>任务设置</h3>
      </el-divider>
      <el-form :model="taskForm" label-width="100px">

        <el-row :gutter="20">

          <h4>基本设置：</h4>
          <el-col :span="8">
            <el-form-item label="最大人数">
              <el-input v-model="taskForm.maxplayer" placeholder="最大人数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最长时间">
              <el-input v-model="taskForm.overtime" placeholder="120min"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 战场配置 -->
        <h4>战场配置：</h4>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="地形">
              <el-select v-model="taskForm.terrain">
                <el-option label="岸滩" value="beach"></el-option>
                <el-option label="雨林" value="rainforest"></el-option>
                <el-option label="战舰" value="ship"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-select v-model="taskForm.time">
                <el-option label="夜间" value="night"></el-option>
                <el-option label="白天" value="day"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="炮火间隔">
              <el-input v-model="taskForm.averageinterval" placeholder="10s"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="波动范围">
              <el-input v-model="taskForm.fluctuationinterval" placeholder="-8, -2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="天气类型">
              <el-select v-model="taskForm.weatherlist.type">
                <el-option label="大雨" value="heavyRain"></el-option>
                <el-option label="晴天" value="sunny"></el-option>
                <el-option label="雾天" value="fog"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="持续时间">
              <el-input v-model="taskForm.weatherlist.duration" placeholder="10s"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" icon="el-icon-plus" @click="addWeather" class="add-button">新增天气</el-button>
        </el-row>
      </el-form>
    </el-card>


    <!-- 任务配置 -->
    <el-card class="box-card">
      <el-divider content-position="left">
        <h3>任务配置</h3>
      </el-divider>

      <el-form :model="taskForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID">
              <el-input v-model="taskForm.taskID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行动名称">
              <el-input v-model="taskForm.actionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker v-model="taskForm.startTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="padding-left: 75px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="油料前送" name="first">
            <el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="燃料加注" name="second"><el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse></el-tab-pane>
          <el-tab-pane label="热食制作" name="third"><el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse></el-tab-pane>
          <el-tab-pane label="热食前送" name="fourth">
            <el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="装备抢修" name="fifth"><el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse></el-tab-pane>
          <el-tab-pane label="卫生勤务" name="sixth">
            <el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.teams" :key="index" :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                    class="add-button">新增成员</el-button>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <el-form-item label="成员 ID">
                          <el-input v-model="member.id"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备 IP">
                          <el-input v-model="member.deviceIP"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="成员身份">
                          <el-select v-model="member.role">
                            <el-option label="提油桶" value="fuelCarrier"></el-option>
                            <el-option label="狙击手" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div style="padding-left: 10px;">
                        <el-form-item label="是否追踪">
                          <el-radio v-model="radio" label="1">是</el-radio>
                          <el-radio v-model="radio" label="2">否</el-radio>
                        </el-form-item>
                      </div>
                      <div style="padding-left: 10px;">
                        <el-form-item label="追踪模式">
                          <el-radio v-model="trackerType" label="1">全身追踪</el-radio>
                          <el-radio v-model="trackerType" label="2">独立追踪</el-radio>
                        </el-form-item>
                      </div>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item label="macID">
                          <el-select v-model="member.macID">
                            <el-option label="SN-12345678" value="fuelCarrier"></el-option>
                            <el-option label="SN-12345678" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="用途">
                          <el-select v-model="member.macID">
                            <el-option label="手切面伤" value="fuelCarrier"></el-option>
                            <el-option label="手切面伤" value="sniper"></el-option>
                          </el-select>
                        </el-form-item>
                        </el-col>
                      </el-row>
                    </el-row>


                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>



  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      trackerType: 1,
      activeName: 'first',
      activeTeam: [],
      taskForm: {
        maxPeople: 24,
        maxTime: "120min",
        terrain: "beach",
        time: "night",
        fireInterval: "10s",
        fluctuationRange: "-8, -2",
        weatherlist: {
          weathertype: "heavyRain",
          duration: "10s"
        },
        taskID: "01",
        actionName: "飓风行动",
        startTime: null,
        teams: [
          {
            id: "001",
            members: [
              {
                id: "0001",
                deviceIP: "192.168.1.1",
                role: "fuelCarrier"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addTeam() {
      this.taskForm.teams.push({
        id: String(this.taskForm.teams.length + 1).padStart(3, "0"),
        members: []
      });
    },
    addMember(teamIndex) {
      this.taskForm.teams[teamIndex].members.push({
        id: String(this.taskForm.teams[teamIndex].members.length + 1).padStart(4, "0"),
        deviceIP: "",
        role: ""
      });
    },
    removeMember(teamIndex, memberIndex) {
      this.taskForm.teams[teamIndex].members.splice(memberIndex, 1);
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}

.add-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
</style>
