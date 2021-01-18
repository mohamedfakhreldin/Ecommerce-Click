<?php

namespace App\CustomClasses;

use Illuminate\Support\Facades\Storage;

class Upload
{
    private $file;
    private $size = 1024 * 1024 * 4;
    private $types = [
        'image/png',
        'image/jpeg'
    ];
    private $errors = [];

    /**
     * checkSize
     *
     * @return bool
     */
    private function checkSize()
    {      if($this->file->getSize() > $this->size){
        $this->errors['size'] = ['The Image Size Greater than 4MB'];
        return false;
    }
    return true;

    }

    /**
     * checkTypes
     *
     * @return bool
     */
    private function checkTypes()
    {
        if(!in_array($this->file->getClientMimeType(), $this->types)){
            $this->errors['types'] = ['The File is Not Image'];

            return false;
        }
        return true;
    }


    /**
     * singleStore
     *
     * @param  mixed $requestFile
     * @return void
     */
    public function  singleStore($requestFile)
    {
        $this->file=$requestFile;
        $file = $this->file;
        $checkSize=$this->checkSize();
        $checkTypes=$this->checkTypes();
         if ($checkSize && $checkTypes ) {
          return $file->storeAs('public/unsaved/image', 'icon' . rand(0, 100000000000000000) . '.' . $file->getClientOriginalExtension());
         }
        return response()->json(['errors'=> $this->errors],422);
    }
    /**
     * multiStore
     *
     * @param  mixed $requestFile
     * @return void
     */
    public function  multiStore(Array $requestFile)
    {
        $this->file=$requestFile;
        $file = $this->file;
        $checkSize=$this->checkSize();
        $checkTypes=$this->checkTypes();
         if ($checkSize && $checkTypes ) {
          return $file->storeAs('public/unsaved/image', 'icon' . rand(0, 100000000000000000) . '.' . $file->getClientOriginalExtension());
         }
        return response()->json(['errors'=> $this->errors],422);
    }
    /**
     * moveFile
     *
     * @param  mixed $filePath
     * @param  mixed $newPath
     * @return void
     */
    public function moveFile($filePath, $newPath = '/images/product/')
    {
        $file = explode('.', $filePath);
        $newFile = $newPath . uniqid().time() . '.' . $file[1];
        Storage::exists($filePath) ?  Storage::move($filePath, 'public/' . $newFile):response()->json(['errors'=>'File not exists',422]);
        return $newFile ;
    }
    /**
     * Get the value of size
     *
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set the value of size
     *
     * @return  self
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get the value of types
     * @return Array $types
     */
    public function getTypes()
    {
        return $this->types;
    }

    /**
     * Set the value of types
     *
     * @return  self
     */
    public function setTypes($types)
    {
        $this->types = $types;

        return $this;
    }
}
