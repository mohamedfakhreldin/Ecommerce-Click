<?php

namespace App\Http\Controllers\Admin;

use App\Category;


use App\Traits\ProductTrait;

use Illuminate\Http\Request;
use App\CustomClasses\Upload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Mockery\Undefined;

class CategoryController extends \App\Http\Controllers\Controller
{
  use ProductTrait;
  private $tableName = 'Category';
  private $model = "App\Category";

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

  public function index()
  {
    if (request()->ajax()) {
      function column($columns)
      {
        $data = [];
        foreach ($columns as $column) {

          array_push($data, str_replace(' ', '_', $column) . ' as ' . $column);
        }
        return $data;
      };

      $tablename = 'categories';
      $row = sprintf('"%s" AS source', $tablename);
      $query = DB::table($tablename)->select(DB::raw($row));
      return $this->model::select(column(['ID', 'Category Name', 'parent', 'Updated At', 'Created At']))->with(['parent' => function ($query) {
        $query = $query->select('id', 'category_name as Name', 'Parent');
      }])->get();
    } else {
      return view('admin.home');
    }
  }

  /**
   * get Categories Option when its request by edit
   */
  private function getCategoriesSelectOptions($id = null)
  {

    $requestId = $id ? $id : '';

    $categories = $this->model::select('id  as value', 'category_name as label', 'parent');
    if ($requestId != '') {
      $categories = $categories->where('id', '!=', $requestId)->get();
      return sub_categories($categories, $requestId);
    } else {
      return $categories->get();
    }
  }



  /**
   * @return Array tree of categories
   */
  public function getMenu()
  {
    return buildTree($this->model::select('*')->get());
  }

  /**
   * get products
   *
   * @param string $category category of products
   * @return array Products
   */
  public function getProducts($category)
  {

    if (request()->ajax()) {
      $categoryID = $this->model::select('id')->where('category_name', $category)->first();
      $categories =  buildTree($this->model::select('*')->get(), $categoryID->id);
      $data = $this->getCategoryChild($categories, $categoryID->id);

      $with = Auth::user() ? ['category', 'offers', 'trademark', 'favourite'] : false;
      $user = request()->user() ? request()->user()->id : null;
      return response()->json($this->products()->withCount(['favourite as favourite'])->whereIn('category_id', $data)->paginate(4));
    }
    return view('layouts.app', ['title' => ucfirst($category)]);
  }
  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    if (request()->ajax()) {
      $data = [];
      $data['parentOptions'] = $this->getCategoriesSelectOptions();

      return $data;
    } else {

      return view('admin.home');
    }
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $data = $this->validate(request(), [
      'category_name' => "required|min:3|unique:categories",
      'parent' => 'required|sometimes|nullable',
      'icon' => 'required|'
    ]);
    $file = explode('.', $data['icon']);
    $newIcon = '/images/icon/' . uniqid() . '.' . $file[1];
    Storage::move($data['icon'], 'public/' . $newIcon);
    $data['icon'] =  $newIcon;

    if ($this->model::create($data)) {


      return getSuccessMessages('create', $this->tableName);
    } else {
      return 'error';
    }
  }
  public function storage()
  {

    if (request()->file()) {
      $files = [];

      return  imageUploader()->singleStore(request()->file('icon'));
    } else {
      return 'no';
    }
  }
  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    if (request()->ajax()) {

      return $this->model::find($id);
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    if (request()->ajax()) {
      $category = $this->model::select('category_name', 'parent')->where('id', $id)->first();
      $this->model::select('category_name', 'icon', 'parent')->where('id', $id)->first();
      $category['parentOptions'] = $this->getCategoriesSelectOptions($id);
      return $category;
    } else {
      return view('admin.home');
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    if (request()->ajax()) {
      $data = $this->validate(request(), [
        'category_name' => "sometimes|nullable|min:3",
        'parent' => 'sometimes|nullable',
        'icon' => 'sometimes|nullable'
      ]);
      $modelFind = $this->model::find($id);
      if (isset($data['icon']) && $data['icon'] !== $modelFind->icon  && Storage::has($data['icon'])) {
        if (Storage::has('public/' . $modelFind->icon)) {
          Storage::delete('public/' . $modelFind->icon);;
        }
        $file = explode('.', $data['icon']);
        $newIcon = 'images/icon/' . uniqid() . '.' . $file[1];
        Storage::move($data['icon'], 'public/' . $newIcon);
        $data['icon'] = $newIcon;
        if ($modelFind->update($data)) {
          return getSuccessMessages('update', $this->tableName);
        } else {
          return 'error';
        }
      }


      if ($id === $data['parent']) {
        $error = ['errors' => ['Category And its Parent Can\'t be Same']];
        return response()->json($error, 422);
      } else {
        if ($modelFind->update($data)) {
          return getSuccessMessages('update', $this->tableName);
        } else {
          return 'error';
        }
      }
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    if (request()->ajax()) {
      $file = $this->model::find($id);
      if ($file->icon) {
        Storage::delete('public/' . $file->icon);
      }
      return $this->model::destroy([$id]) ? getSuccessMessages('delete', $this->tableName) : 'error';
    } else {
      return view('admin.home');
    }
  }
}
