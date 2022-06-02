cd ./backend

pip install -r requirements.txt

./init_db.sh

./run.sh &

cd ../client
cnpm i --save
npm start &