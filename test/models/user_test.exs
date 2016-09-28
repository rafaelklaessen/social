defmodule Social.UserTest do
  use Social.ModelCase

  alias Social.User

  @valid_attrs %{banner: "some content", bio: "some content", birthday: "some content", followers: "some content", following: "some content", likes: "some content", lists: "some content", location: "some content", name: "some content", profile_picture: "some content", settings: "some content", theme_color: "some content", username: "some content", website: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
