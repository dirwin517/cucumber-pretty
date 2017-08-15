@tag-2
Feature: Feature 2

  Background: Background 2-1
    Given given 2-1
    And and 2-1

  @tag2-2-1
  Scenario Outline: Scenario Outline 2-2
    When <when>
    Then <then>

    @tag2-2-2
    Examples:
      | when       | then       |
      | when 2-2-1 | then 2-2-1 |
      | when 2-2-2 | then 2-2-2 |
