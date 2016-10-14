defmodule Social.ListController do
  use Social.Web, :controller

  alias Social.User

  plug :put_profile_layout, "user.html"

  def index(conn, %{"username" => username}) do
    data_query = from u in User,
                 where: u.username == ^username,
                 select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Lorem (@#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("lists.html")
    end
  end

  def edit(conn, %{"username" => username, "id" => list_name}) do
    data_query = from u in User,
                 where: u.username == ^username,
                 select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Edit list #{list_name}")
      |> assign(:username, username)
      |> assign(:data, data)
      |> assign(:list_name, list_name)
      |> render("edit.html")
    end
  end

  def new(conn, %{"username" => username}) do
    data_query = from u in User,
                 where: u.username == ^username,
                 select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Create a new list on Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("new.html")
    end   
  end

  def show(conn, %{"username" => username, "id" => list_name}) do
    data_query = from u in User,
                 where: u.username == ^username,
                 select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "#{username}/#{list_name} on Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> assign(:list_name, list_name)
      |> render("show.html")
    end    
  end

  def create(conn, _params) do
    # Create user in database
    redirect conn, to: "/"
  end

  def update(conn, _params) do
    # Update user in database
    redirect conn, to: "/"
  end

  def delete(conn, _params) do
    # Delete user from database
    redirect conn, to: "/"
  end

  def redirect_list(conn, %{"username" => username, "list_name" => list_name}) do
    redirect conn, to: "/users/#{username}/lists/#{list_name}"
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
