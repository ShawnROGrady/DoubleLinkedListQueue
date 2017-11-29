//Code By Shawn O'Grady

/*
+In trying to learn JS I am trying to implement some common data structures

+This is my attempt at a doubly linked list queue
+Values in the queue will be of string type


+End goal is to have user enter prompts (in main function) in order to perform the following functions:
  1. enqueue a value
  2. dequeue a value
  3. print the entire queue (forward or reverse)
  4. search the queue for a specified value
  5. close the program

+I currently believe I can:
  -enqueue values
  -dequeue values
  -print the queue (forward or reverse)
    -changing print direction involves changing the queue's public API
      -for my own personal practice w/ modules
  -search functionality
  -from user input
*/

//using strict mode for safety
"use strict";

//Node for doubly linked list:
function dllNode(){

  var value, prevNode, nextNode;

  function doSetValue(input){
    this.value=input;
  }

  function doSetNextNode(newNode){
    this.nextNode=newNode;
  }

  function doSetPrevNode(newNode){
    this.prevNode=newNode;
  }

  var NodeAPI={
    setValue:doSetValue,
    setNextNode:doSetNextNode,
    setPrevNode:doSetPrevNode
  }

  return NodeAPI;
}

//dll queue:
function dllQueue(){
  var head=dllNode();  //node that will be dequeued first
  var tail=dllNode();  //node that will be dequeued last
  //var forward=true; //keeps track of which direction we are printing
  var elements=0; //number of nodes in the queue

  function doEnqueue(input){
    var newNode=dllNode();
    newNode.setValue(input);
    elements++;
    alert(input+" was enqueued");
    if(tail.value!=null){
      //there are things in the queue
      tail.setNextNode(newNode);
      newNode.setPrevNode(tail);
      tail=newNode;
    }else{
      head=newNode;
      tail=newNode;
    }
  }

  function doDequeue(){
    if(head.value!=null){
      //things in the queue
      var tmp=head;
      if(head!=tail){
        //we're not at the end of the list
        head=head.nextNode;
      }else{
        head=dllNode();
        tail=dllNode();
      }
      alert(tmp.value+" was dequeued");
      elements--;
    }else{
      alert("queue is empty, cannot dequeue anything");
    }
  }

  function doSearch(searchValue){
    var position=0;  //position of value searched for in queue

    if(head.value!=null){
      //there are things in the queue
      var tmp=head;

      //traverse queue searching for specific value
      do{
        if (tmp.value==searchValue){
          //value found
          break;
        }
        tmp=tmp.nextNode;
        position++;
      }while(tmp!=tail);

      //at this point, we've either find the value or are at the tail
      if(tmp.value!=searchValue){
        alert(searchValue+" was not found in the queue");
      }
      else{
        alert(searchValue+" found in queue at position: "+position+"\r(position 0 being the next to be dequeued)");
      }

    }else{
      //queue is empty
      alert("queue is empty, cannot search for a value");
    }
  }

  function printForward(){
    if(head.value!=null){
      //things in queue
      var forwardString="Queue contains(in order): \r";
      var i=0;

      var tmp=head;
      forwardString=forwardString+i+". " +tmp.value+"\r";

      while(tmp!=tail){
        tmp=tmp.nextNode;
        i++;
        forwardString=forwardString+i+". " +tmp.value+"\r";
      }
      alert(forwardString);
    }else{
      alert("queue is empty");
    }

  }

  function printReverse(){
    if(tail.value!=null){
      //things in queue
      var reverseString="Queue contains(in reverse order): \r";
      var i=elements-1;

      var tmp=tail;
      reverseString=reverseString+i+". " +tmp.value+"\r";

      while(tmp!=head){
        tmp=tmp.prevNode;
        i--;
        reverseString=reverseString+i+". " +tmp.value+"\r";
      }
      alert(reverseString);
    }else{
      alert("queue is empty");
    }
  }

  function changePrint(direction){
    if(direction=="forward"||direction=="f"||direction=="Forward"||direction=="F"){
      publicAPI.print=printForward;
    }
    else if(direction=="reverse"||direction=="r"||direction=="Reverse"||direction=="R"){
      publicAPI.print=printReverse;
    }
    else{
      alert("invalid input");
    }

  }

  var publicAPI={
    enqueue:doEnqueue,
    dequeue:doDequeue,
    search:doSearch,
    changePrint:changePrint,
    print:printForward  //prints in forward direction first
  };

  return publicAPI;

}

//main function:
(function main(){
  var q=dllQueue();
  var choice;
  do{
    choice=prompt("What would you like to do? \r 1. enqueue a value \r 2. dequeue a value \r 3. print the queue \r 4. search the queue \r 5. terminate program");
    if(choice==1){
      //enqueue a value
      var userInput=prompt("enter a value to enqueue");
      q.enqueue(userInput);
    }
    else if(choice==2){
      //dequeue a value
      q.dequeue();
    }
    else if(choice==3){
      //print the queue
      var dir=prompt("which direction do you wish to print (\"forward\" or \"reverse\")?");
      q.changePrint(dir);
      q.print();
    }
    else if(choice==4){
      //search the queue
      var searchInput=prompt("enter a value to search for");
      q.search(searchInput);
    }
    else if (choice==5||choice==null){
      //user wants to terminate or hit "cancel" button
      alert("thank you for using this program");
    }
    else{
      //invalid choice
      alert("please enter a valid choice");
    }
  }while(choice!=5 && choice!=null);
})();
/*
//testing basic functionality:
var q=dllQueue();

//testing if properly recognizes empty queue:
q.print();  //"queue is empty"
q.changePrint("reverse");
q.print();  //"queue is empty"
q.dequeue();  //"queue is empty, cannot dequeue anything"
q.changePrint("forward");

//testing to see if propery enqueues:
q.enqueue("one");
q.enqueue("two");
q.enqueue("three");
q.enqueue("four");
q.enqueue("five");
q.print();  //0. one,1. two,2. three,3. four,4. five

//testing if can change print direction:
q.changePrint("Reverse");
q.print();  //4. five,3. four,2. three,1. two,0. one

//testing if properly dequeues:
q.dequeue();
q.dequeue();
q.dequeue();
q.print();  //1. five, 0. four
q.changePrint("f");
q.print();  //0. four, 1. five
q.dequeue();
q.dequeue();
q.dequeue();  //"queue is empty, cannot dequeue anything"
q.print();  //"queue is empty"

//checking if refills after being emptied:
q.enqueue("six");
q.enqueue("seven");
q.enqueue("eight");
q.enqueue("nine");
q.print();  //0. six,1. seven,2. eight,3. nine
q.changePrint("r");
q.print();  //3. nine,2. eight,1. seven,0. six
*/
