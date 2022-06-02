fname=`basename $0`
pdir=`cd -P $(dirname $0); pwd`
ifile=$pdir/$fname
cd $pdir

echo $pwd

cd client
npm i --save
npm start

pause