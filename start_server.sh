fname=`basename $0`
pdir=`cd -P $(dirname $0); pwd`
ifile=$pdir/$fname
cd $pdir

echo $pwd
cd backend

echo install python packages
./install.sh
echo init flask datebase
./init_db.sh
echo start flask server
./run.sh &