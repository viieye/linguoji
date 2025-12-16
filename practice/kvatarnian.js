setTimeout(main,50)

function qvatmult(m4a,m4b) {
  let ansmatr =[
      m4b[0]*m4a[0]-m4b[1]*m4a[1]-m4b[2]*m4a[2]-m4b[3]*m4a[3],
      m4b[0]*m4a[1]+m4b[1]*m4a[0]+m4b[2]*m4a[3]-m4b[3]*m4a[2],
      m4b[0]*m4a[2]+m4b[2]*m4a[0]+m4b[3]*m4a[1]-m4b[1]*m4a[3],
      m4b[0]*m4a[3]+m4b[3]*m4a[0]+m4b[1]*m4a[2]-m4b[2]*m4a[1],
  ]
  return ansmatr
}

function qvatgenr(mag) {
  return [
    rund(mag),
    rund(mag),
    rund(mag),
    rund(mag),
    ]
}

function rund(num) {
  return Math.floor(Math.random()*num)
}

function main() {
  let q1 = qvatgenr(10)
  let q2 = qvatgenr(10)
  let mq0 = [2,0,0,0]
  let mq1 = [3,0,0,0]
  
  let q3 = qvatmult(q1,q2)
  let q4 = qvatmult(mq0,mq1)
  
  console.log(q1,q2)
  console.log(q3)
  console.log(q4)
}