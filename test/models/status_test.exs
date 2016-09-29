defmodule Social.StatusTest do
  use Social.ModelCase

  alias Social.Status

  @valid_attrs %{content: "some content", hashtags: "some content", mentions: "some content", owner: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Status.changeset(%Status{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Status.changeset(%Status{}, @invalid_attrs)
    refute changeset.valid?
  end
end
