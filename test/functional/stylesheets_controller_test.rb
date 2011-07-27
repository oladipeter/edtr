require 'test_helper'

class StylesheetsControllerTest < ActionController::TestCase
  setup do
    @stylesheet = stylesheets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:stylesheets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create stylesheet" do
    assert_difference('Stylesheet.count') do
      post :create, :stylesheet => @stylesheet.attributes
    end

    assert_redirected_to stylesheet_path(assigns(:stylesheet))
  end

  test "should show stylesheet" do
    get :show, :id => @stylesheet.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @stylesheet.to_param
    assert_response :success
  end

  test "should update stylesheet" do
    put :update, :id => @stylesheet.to_param, :stylesheet => @stylesheet.attributes
    assert_redirected_to stylesheet_path(assigns(:stylesheet))
  end

  test "should destroy stylesheet" do
    assert_difference('Stylesheet.count', -1) do
      delete :destroy, :id => @stylesheet.to_param
    end

    assert_redirected_to stylesheets_path
  end
end
