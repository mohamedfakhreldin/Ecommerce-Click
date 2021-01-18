<?php
namespace App\Traits;

trait SuccessMessager

{

    private function createMessage($name,$additionData=null)
    {

        return  response()->json(['successMessage'=> $name . ' ' . 'Created Successfully',$additionData]);
    }
    private function customMessage($message)
    {
        return  response()->json(['successMessage'=> $message]);
    }


    private function updateMessage($name)
    {
        return  response()->json(['successMessage'=> $name . ' ' . 'Updated Successfully']);
    }
    private function deleteMessage($name)
    {
        return  response()->json(['successMessage'=>$name . ' ' . 'Deleted Successfully']);
    }
}
