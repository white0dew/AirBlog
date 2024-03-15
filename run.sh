git stash && git pull
# rm -rf /www/server/nginx/proxy_cache_dir/*
pnpm install && pnpm build &&(
pid=$(lsof -t -i:3100)

if [ -z "$pid" ]
then
  echo "没有找到使用$port端口的进程。"
else
  # 终止进程
  echo "正在关闭进程$pid..."
  kill $pid
  echo "进程$pid已关闭。"
fi
)&& pm2 start ecosystem.config.js --env production