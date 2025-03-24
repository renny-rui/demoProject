# Vue项目部署指南

## Nginx反向代理配置

本项目使用Nginx作为Web服务器和反向代理，用于部署Vue前端应用并转发API请求到后端服务。

### 文件说明

1. `nginx.conf` - Nginx配置文件，包含静态文件服务和API反向代理设置
2. `Dockerfile` - 用于构建Docker镜像的配置文件
3. `docker-compose.yml` - 用于编排前端和后端服务的Docker Compose配置

## 部署步骤

### 方法一：直接部署（不使用Docker）

1. **构建Vue项目**

   ```bash
   npm run build
   ```

   这将在`dist`目录中生成生产就绪的静态文件。

2. **配置Nginx**

   将`nginx.conf`文件中的配置复制到您的Nginx服务器配置中。确保修改以下内容：
   
   - 将`root /usr/share/nginx/html;`中的路径更改为您实际的Vue项目dist目录路径
   - 将`proxy_pass http://backend-server:5000/;`中的URL更改为您实际的后端服务地址

3. **重启Nginx服务**

   ```bash
   sudo service nginx restart
   ```

### 方法二：使用Docker部署

1. **修改docker-compose.yml**

   更新`docker-compose.yml`文件中的后端服务配置，替换`your-backend-image:latest`为您实际的后端服务镜像。

2. **构建并启动服务**

   ```bash
   docker-compose up -d
   ```

   这将构建前端镜像并启动前端和后端服务。

## API代理说明

Nginx配置中的反向代理设置如下：

```nginx
location /api/ {
    proxy_pass http://backend-server:5000/;
}
```

这意味着：

- 前端发送到`/api/users`的请求将被代理到`http://backend-server:5000/users`
- 路径中的`/api`前缀会被自动移除

## 开发环境代理配置

在开发环境中，您可以使用Vue CLI的代理功能。在`vue.config.js`中已添加以下配置（目前已注释）：

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
```

如需在开发环境中使用，请取消这些注释并确保后端服务在localhost:5000运行。

## 注意事项

1. 确保后端服务允许来自Nginx代理的请求
2. 如果使用HTTPS，需要额外的SSL配置
3. 在生产环境中，应考虑添加缓存和安全设置
