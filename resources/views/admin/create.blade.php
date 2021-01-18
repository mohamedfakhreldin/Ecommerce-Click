@extends('admin.index')
@section('content')
@foreach($errors->all() as $error)
{{$error}}
@endforeach
<div  class="content-wrapper">
            <center><h1>Create {this.props.table}</h1></center>
                <form action="{{url('admin/tables/users/')}}" method='post' >
                {{method_field('POST')}}
                    @csrf
            <label > Name : </label>
            <input type='name' name='name' class='form-control' value="{{old('name')}}" placeholder="Enter your name" /><br />
            <label > Email: </label>
            <input type='email' name="email" class='form-control'placeholder="Enter your email"  /><br />
            <label > Password : </label>
            <input type='password' name='password' class='form-control' placeholder="Enter your password"  /><br />
            <label > Comfirm Password : </label>
            <input type='password' name='comfirm_password' class='form-control' placeholder="Enter your comfirm password"  /><br />
            <button type="submit" class='btn btn-primary'>Submit</button>
                </form>
            </div>

@endsection