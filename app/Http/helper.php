<?php

use Illuminate\Database\Eloquent\Model;

if (!function_exists('admin')) {
    /**
     * @return string Admin Auth Data
     */
    function admin()
    {
        return auth()->guard('admin');
    }
}
if (!function_exists('getSuccessMessages')) {
    /**
     * @param string $message have ['create','delete','update'] or create your message
     * @param string $name name of column or table that create, delete or update
     * @return string Success Messages
     */
    function getSuccessMessages(string $message, string $name)
    {
        $successMessages = [
            'create'=>$name . ' ' . 'Created Successfully',
            'delete'=>$name . ' ' . 'Deleted Successfully',
            'update'=>$name . ' ' . 'Updated Successfully',
        ];
        $messageCheck=in_array($message,array_keys($successMessages));
        $successMessage = $messageCheck? $successMessages[$message] : $message;
        return  response()->json(['successMessage'=> $successMessage] ) ;
    }
}
if (!function_exists('imageUploader')) {
    /**
     * @param string $message have ['create','delete','update'] or create your message
     * @param string $name name of column or table that create, delete or update
     * @return string Success Messages
     */
    function imageUploader()
    {
        return new \App\CustomClasses\Upload;
    }

}
if (!function_exists('authCheck')) {
    /**
     * @param string $message have ['create','delete','update'] or create your message
     * @param string $name name of column or table that create, delete or update
     * @return string Success Messages
     */
    function authCheck()
    {
        //return new \App\Http\Controllers\Controller->authorize();
    }

}

 /**
  * buildTree
  *
  * @param  mixed $elements
  * @param  mixed $parentId
  * @return array
  */
 function buildTree($elements, $parentId = 0)
{
    $branch = array();

    foreach ($elements as $element) {
        if ($element->parent == $parentId) {
            $children = buildTree($elements, $element->id);
            if ($children) {
                $element->children = $children;
            }
            $branch[] = $element;
        }
    }

    return $branch;
}
if (!function_exists('joinTables')) {
    function joinTables($model,$selectData,array $tables,$joinType='leftJoin')
    {

    $result=$model::select($selectData);
        foreach ($tables as $key => $value) {

           $result=$result->$joinType($key, $value['local_key'], '=', $value['foreign_key']);
        }
        return $result;
    }    }
if (!function_exists('niceNameColumn')) {
    function niceNameColumn($columnName)
    {
        $data = [];
        foreach ($columnName as $column) {
            # code...
            foreach ($column as $key => $value) {
                $upperColumn = ucwords(str_replace('_', ' ', $key), ' ');

                if (!is_object($value)) {

                    $data[$upperColumn] = $value;

                } else {

                    $data[$upperColumn] = niceNameColumn($value);

                }
            }
        }
        return $data;
    }
}

function doSearch($result)
{

    if (strlen($result) > 0) {
        $resultAfterForeach = [];
        foreach ($result as $resultIndex) {
            $resultAfterForeach[$resultIndex] = '';
            foreach ($resultIndex as $resultKey => $resultValue) {

                $resultAfterForeach[$resultIndex][niceNameColumn($resultKey)] = $resultValue;
            }
        }
        return $resultAfterForeach;
    }
    return;
}


if (!function_exists('sub_categories')) {
    /**
     * @param string $id Main Category ID
     * @param  array $result Categories Before Filter Childrens
     * @return array  Categories Not Childrens Of Main Category
     */
    function sub_categories($result, $id)
    {
        $childId = [];

        $remain = array();

        foreach ($result as $k => $v) {
            if (isset($v->parent) && $v->parent == $id) {
                array_push($childId, $v->value);
            } else {
                array_push($remain, $v);
            }
        }
        if (count($childId) > 0) {
            foreach ($childId as $child) {
                return  sub_categories($remain, $child);
            }
        } else {
            return $remain;
        }
    }
}







if (!function_exists('isAssociativeArray')) {
    /**
     * isAssociativeArray
     *
     * @param  array $array
     * @return bool
     */
    function isAssociativeArray(array $array)
    {
        if (array_keys($array) !== range(0, count($array))) {
            return true;
        } else {
            return false;
        }
    }
}
if (!function_exists('getTable')) {
    function getTable($tableName, $columnsName = '*')
    {

        /**
         *
         * get table columns with nice name
         * @params Table Name string
         * @params Nice Names Array
         * return Table Data
         */
        $data = \Illuminate\Support\Facades\DB::table($tableName);
        if (is_array($columnsName)) {
            if (isAssociativeArray($columnsName)) {
                foreach ($columnsName as $key => $column) {
                    $data = $data->addSelect($key . ' as ' . $column);
                }
            } else {
                foreach ($columnsName as $column) {
                    $data = $data->addSelect($column);
                }
            }
        } else {
            $data = $data->select($columnsName);
        }




        return $data;
    }
}
