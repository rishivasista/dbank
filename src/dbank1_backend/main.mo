import Float "mo:base/Float";
// To use print statements
import Debug "mo:base/Debug";
import Time "mo:base/Time";

// Class to hold container
actor DBank {
   stable var startTime = Time.now();

  // Creating new canister
  stable var currentValue:Float = 300;
  

  public func topUp(amount : Float) {
    currentValue += amount; 
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;
    if (tempValue <= 0) {
      Debug.print("Insufficient Funds");
    } else {
      currentValue -= amount;
    };
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let elapsedTimeNS = currentTime - startTime;
    let elapsedTimeS = (elapsedTimeNS / 60000000000);
    currentValue := currentValue * (1.01 ** Float.fromInt(elapsedTimeS));
    startTime := currentTime;
  }; 
 

};
